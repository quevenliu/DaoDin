const pool = require('./db').pool;
const Cache = require('../utils/cache');

async function createGroup(myId, name, category, location, description, imageUrl) {
    let Query = `SELECT * FROM \`group\` WHERE category =  ? AND location = ? AND status = 'pending'`;
    const [groupExist] = await pool.query(Query, [category, location]);
    if (name === undefined || category === undefined || location === undefined || groupExist.length > 0) {
        return false;
    }
    Query = `
                INSERT INTO \`group\` (name, category, location, description, creator_id, picture, status) 
                VALUES (?, ?, ?, ?, ?, ?, 'pending')
            `;
    const [result] = await pool.query(Query, [name, category, location, description, myId, imageUrl]);
    return result.insertId;
}

async function getGroup(groupId) {

    const cacheKey = `group_${groupId}`;
    const cacheData = await Cache.getCache(cacheKey);

    if (cacheData) {
        return cacheData;
    }

    const [data] = await pool.query('SELECT g.*, r.area FROM \`group\` AS g LEFT JOIN region AS r ON r.city = g.location WHERE id = ?', [groupId]);
    if (data.length === 0) { return false; }

    returnData = {
        "group_id": parseInt(groupId),
        "name": data[0]["name"],
        "category": data[0]["category"],
        "location": data[0]["location"],
        "description": data[0]["description"],
        "status": data[0]["status"],
        "creator_id": data[0]["creator_id"],
        "picture": data[0]["picture"],
        "area": data[0]["area"]
    }

    Cache.addCache(cacheKey, returnData, { expire: 60 * 60 * 24, resetExpire: true });

    return returnData;
}

async function updateGroup(myId, groupId, name, category, location, description, picture) {

    let Query = `SELECT * FROM \`group\` WHERE id =  ? AND creator_id = ?  `;
    const [groupExist] = await pool.query(Query, [groupId, myId]);
    if (groupExist.length === 0) { return false; }

    Query = `   UPDATE \`group\` 
                SET name = ?, category = ?, location = ?, description = ?, picture = ?  
                WHERE id = ?
            `;
    const [result] = await pool.query(Query, [name, category, location, description, picture, groupId]);

    Cache.deleteCache(`group_${groupId}`);

    return parseInt(groupId);
}

async function joinGroup(myId, groupId, nickname, self_intro, match_msg) {
    if (nickname === null || self_intro === null || match_msg === null) { return false; }
    let Query = `SELECT * FROM \`group\` WHERE id =  ? `;

    const [groupExist] = await pool.query(Query, [groupId]);

    const [joined] = await pool.query('SELECT * FROM membership WHERE user_id = ? AND group_id =?', [myId, groupId]);
    if (joined.length > 0 || groupExist.length === 0) { return false; }

    Query = `INSERT INTO membership (user_id, group_id, nickname, self_intro, match_msg ) VALUES (?, ?, ?, ?, ?)`;
    const [data] = await pool.query(Query, [myId, groupId, nickname, self_intro, match_msg]);
    return parseInt(groupId);

}

async function leaveGroup(myId, groupId) {

    const [joined] = await pool.query('SELECT * FROM membership WHERE user_id = ? AND group_id = ?', [myId, groupId]);
    if (joined.length === 0) { return false; }
    await pool.query('DELETE FROM membership where user_id = ? AND group_id = ?', [myId, groupId]);
    return parseInt(groupId);
}


async function searchGroup(category, location, sort, joined, cursor, myId, creatorId) {

    sort = sort || "recent";

    let Query = `
    SELECT  DISTINCT g.id, g.name, g.category, g.location, g.description, g.status, g.creator_id, g.picture, g.area, g.count, ISNULL(g.isJoined) AS isJoined FROM (
    SELECT  \`group\`.*, membership.user_id as isJoined, region.area , COUNT(membership.user_id) AS count
    FROM \`group\`
    LEFT JOIN membership ON membership.group_id = \`group\`.id
    LEFT JOIN region ON region.city = \`group\`.location WHERE 1=1 
    `;

    const params = [];

    if (Array.isArray(category)) {
        for (let i = 0; i < category.length; i++) {
            if (i === 0) {
                Query += ` AND (category = ? `;
            } else {
                Query += ` OR category = ? `;
            }
            params.push(category[i]);
        }
        Query += `) `;
    }

    if (Array.isArray(location)) {
        for (let i = 0; i < location.length; i++) {
            if (i === 0) {
                Query += ` AND (location = ? `;
            } else {
                Query += ` OR location = ? `;
            }
            params.push(location[i]);
        }
        Query += `) `;
    }


    if (creatorId == 1) {
        Query += ` AND creator_id = ? `;
        params.push(myId);
    } else if (creatorId == 0) {
        Query += ` AND creator_id != ? `;
        params.push(myId);
    }
    if (cursor !== undefined) {
        if (sort === "recent") {
            Query += ` AND  id <= ? `;
            params.push(cursor);
        } else {
            Query += ` AND  id <= ? `;
            params.push(cursor.id);
        }
    }

    Query += ` GROUP BY membership.group_id ) AS g`;

    Query += ` LEFT JOIN membership ON membership.group_id = g.id AND membership.user_id = ?  WHERE 1=1 `;
    params.push(myId);

    if (!creatorId) {
        if (joined == 0) {
            Query += ` AND membership.user_id IS NULL `;
            Query += ` AND status = 'pending' `;
        } else if (joined == 1) {
            Query += ` AND membership.user_id = ? `;
            params.push(myId);
        }
    }

    if (sort === "popular" && cursor !== undefined) {
        Query += ` AND count <= ? `;
        params.push(cursor.count);
    }

    if (sort === "recent") {
        Query += " ORDER BY id DESC ";
    }
    else if (sort === "popular") {
        Query += " ORDER BY count DESC, id DESC ";
    }

    Query += ' LIMIT 11'
    let nextCursor = null;
    const [groups] = await pool.query(Query, params);

    if (groups.length === 11) {

        if (sort === "recent") {
            nextCursor = groups[10].id.toString();
            nextCursor = Buffer.from(nextCursor).toString("base64");
            groups.splice(10, 1);
        }
        else if (sort === "popular") {
            nextCursor = {
                id: groups[10].id.toString(),
                count: groups[10].count.toString()
            }
            nextCursor = Buffer.from(JSON.stringify(nextCursor)).toString("base64");
            groups.splice(10, 1);
        }
    }


    const groupList = {
        "groups": groups.map((group) => {
            return {

                "group_id": group["id"],
                "name": group["name"],
                "category": group["category"],
                "location": group["location"],
                "description": group["description"],
                "status": group["status"],
                "creator_id": group["creator_id"],
                "picture": group["picture"],
                "area": group["area"],
                "count": group["count"],
                "isJoined": group["isJoined"]
            }
        }),

        "next_cursor": nextCursor
    }
    return groupList;

}

async function getGroupMemberCount(groupId) {

    const [data] = await pool.query('SELECT COUNT(*) as count FROM membership WHERE group_id = ?', [groupId]);

    return data[0]["count"];
}

async function getAllMembers(groupId) {
    const [data] = await pool.query('SELECT * FROM membership WHERE group_id = ?', [groupId]);
    return data;
}

async function switchToComplete(groupId) {
    await pool.query(`UPDATE \`group\` SET status = 'complete' , created_at = NOW() WHERE id = ?`, [groupId]);
    Cache.deleteCache(`group_${groupId}`);
}

async function getMembership(myId, groupId) {
    const [data] = await pool.query('SELECT * FROM membership WHERE user_id = ? AND group_id = ?', [myId, groupId]);
    return data[0];
}


module.exports = {
    createGroup,
    getGroup,
    updateGroup,
    joinGroup,
    leaveGroup,
    searchGroup,
    getGroupMemberCount,
    getAllMembers,
    switchToComplete,
    getMembership
}
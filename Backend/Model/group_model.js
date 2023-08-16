const pool = require('./db').pool;

async function createGroup(myId, name, category, location, description, imageUrl) {
    let Query = `SELECT * FROM \`group\` WHERE category =  ? AND location = ? `;
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
    const [data] = await pool.query('SELECT * FROM \`group\` WHERE id = ?', [groupId]);
    if (data.length === 0) { return false; }

    returnData = {
        "group_id": parseInt(groupId),
        "name": data[0]["name"],
        "category": data[0]["category"],
        "location": data[0]["location"],
        "description": data[0]["description"],
        "status": data[0]["status"],
        "creator_id": data[0]["creator_id"],
        "picture": data[0]["picture"]

    }
    return returnData;
}

async function updateGroup(myId, groupId, name, category, location, description, picture) {

    let Query = `SELECT * FROM \`group\` WHERE id =  ? AND creator_id = ? `;
    const [groupExist] = await pool.query(Query, [groupId, myId]);
    if (groupExist.length === 0) { return false; }

    Query = `   UPDATE \`group\` 
                SET name = ?, category = ?, location = ?, description = ?, picture = ?  
                WHERE id = ?
            `;
    const [result] = await pool.query(Query, [name, category, location, description, picture, groupId]);
    return parseInt(groupId);

}

async function joinGroup(myId, groupId, nickname, self_intro, match_msg) {
    if (nickname === null || self_intro === null || match_msg === null) { return false; }
    let Query = `SELECT * FROM \`group\` WHERE id =  ? `;
    const [groupExist] = await pool.query(Query, [groupId]);

    const [joined] = await pool.query('SELECT * FROM membership WHERE user_id = ? AND group_id', [myId, groupId]);
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


async function searchGroup(category, location, sort, joined, cursor, myId) {
    let Query = `
                    SELECT  \`group\`.id, \`group\`.*, membership.user_id
                    FROM \`group\`
                    LEFT JOIN membership ON membership.group_id = \`group\`.id AND membership.user_id = ?
                    `;


    const params = [myId];
    params.push()
    if (category !== undefined && location !== undefined) {
        Query += ` WHERE category = ? AND location = ?`;
        params.push(category, location);
    } else if (category !== undefined) {
        Query += ` WHERE category = ?`;
        params.push(category);
    } else if (location !== undefined) {
        Query += ` WHERE location = ?`;
        params.push(location);
    } else {
        Query += ` WHERE 1=1`;
    }
    if (joined == 0) {
        Query += ` AND user_id IS NULL `;
    } else if (joined == 1) {
        Query += ` AND user_id = ? `;
        params.push(myId);
    }
    if (cursor !== undefined) {
        if (sort === "recent") {
            Query += ` AND  id <= ? `;
        } else {
            Query += ` AND  id >= ? `;
        }
        params.push(cursor);
    }

    if (sort === "recent") {
        Query += " ORDER BY id DESC ";

    }
    Query += ' LIMIT 11'
    let nextCursor = null;
    const [groups] = await pool.query(Query, params);
    // 判斷是否有下一頁
    if (groups.length === 11) {

        nextCursor = groups[10].id.toString();
        nextCursor = Buffer.from(nextCursor).toString("base64");
        groups.splice(10, 1);

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
                "picture": group["picture"]


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


module.exports = {
    createGroup,
    getGroup,
    updateGroup,
    joinGroup,
    leaveGroup,
    searchGroup,
    getGroupMemberCount,
    getAllMembers
}


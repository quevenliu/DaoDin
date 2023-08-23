const pool = require('./db').pool;
const Cache = require('../utils/cache');

async function getMatch(myId, groupId) {

    matchId = await getMatchIdByUserIdAndGroupId(myId, groupId);

    var cacheKey = `match_${matchId}`;
    const cacheData = await Cache.getCache(cacheKey);
    if (cacheData) {
        return cacheData;
    }

    let Query = `
                SELECT  U.picture, MEM.self_intro, MEM.match_msg, MEM.nickname, MU.match_id, MU.user_id, G.name AS group_name
                FROM match_user AS MU
                LEFT JOIN user AS U ON MU.user_id = U.id 
                LEFT JOIN \`match\` AS M ON M.id = MU.match_id
                LEFT JOIN membership AS MEM ON MEM.group_id = M.group_id AND MEM.user_id = MU.user_id
                LEFT JOIN \`group\` AS G ON G.id = M.group_id
                WHERE M.group_id = ?;
            `;

    let [members] = await pool.query(Query, groupId);
    const foundMember = members.find(member => member.user_id === myId);
    if (!foundMember) { return false; }
    matchId = foundMember["match_id"];
    members = members.filter(member => member.match_id === matchId);


    const matchList = {
        "users": members.map((user) => {
            return {
                "user_id": user["user_id"],
                "picture": user["picture"],
                "self_intro": user["self_intro"],
                "match_msg": user["match_msg"],
                "nickname": user["nickname"]
            }
        }),

        "matched_group_id": members[0]["match_id"],
        "group_name": members[0]["group_name"],
    }

    Cache.addCache(cacheKey, matchList, { expire: 60 * 60 * 24, resetExpire: true });

    return matchList;

}

async function leaveMatch(myId, groupId) {

    const matchId = await getMatchIdByUserIdAndGroupId(myId, groupId);
    if (!matchId) { return false; }
    await pool.query('DELETE FROM match_user where user_id = ? AND match_id = ?', [myId, matchId]);
    Cache.deleteCache(`match_${matchId}`);
    Cache.deleteCache(`match_${myId}_${groupId}`);
    return parseInt(matchId);
}

async function createMatch(groupId) {
    const [result] = await pool.query('INSERT INTO \`match\` (group_id) VALUES (?)', [groupId]);
    return result.insertId;
}

async function joinMatch(user_list, matchId) {
    for (let i = 0; i < user_list.length; i++) {
        await pool.query('INSERT INTO match_user (user_id, match_id) VALUES (?, ?)', [user_list[i], matchId]);
    }
    Cache.deleteCache(`match_${matchId}`);
    return matchId;
}

async function getMatchIdByUserIdAndGroupId(userId, groupId) {

    const cacheGroupIDKey = `match_${userId}_${groupId}`;
    var matchId = await Cache.getCache(cacheGroupIDKey);

    if (matchId) {
        return matchId;
    }

    let Query = `
                    SELECT  *
                    FROM match_user AS MU
                    LEFT JOIN \`match\` AS M ON M.id = MU.match_id
                    WHERE M.group_id = ? AND MU.user_id = ?; 
                `
    const [joined] = await pool.query(Query, [groupId, userId]);
    if (joined.length === 0) { return false; }

    Cache.addCache(cacheGroupIDKey, joined[0]["match_id"], { expire: 60 * 60 * 24, resetExpire: true });

    return parseInt(joined[0]["match_id"]);
}

module.exports = {
    getMatch,
    leaveMatch,
    createMatch,
    joinMatch
}

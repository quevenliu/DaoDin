const pool = require('./db').pool;

async function getMatch(myId, groupId) {
    let Query = `
                SELECT  U.picture, MEM.self_intro, MEM.match_msg, MEM.nickname, MU.match_id, MU.user_id
                FROM match_user AS MU
                LEFT JOIN user AS U ON MU.user_id = U.id 
                LEFT JOIN \`match\` AS M ON M.id = MU.match_id
                LEFT JOIN membership AS MEM ON MEM.group_id = M.group_id AND MEM.user_id = MU.user_id
                WHERE M.group_id = ?;
            `;

    let [members] = await pool.query(Query, groupId);
    const foundMember = members.find(member => member.user_id === myId);
    if (!foundMember) { return false; }
    const matchId = foundMember["match_id"];
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

        "matched_group_id": members[0]["match_id"]
    }
    //console.log(matchList)
    return matchList;

}

async function leaveMatch(myId, groupId) {

    let Query = `
                    SELECT  *
                    FROM match_user AS MU
                    LEFT JOIN \`match\` AS M ON M.id = MU.match_id
                    WHERE M.group_id = ? AND MU.user_id = ?;  
                `
    const [joined] = await pool.query(Query, [groupId, myId]);
    if (joined.length === 0) { return false; }
    await pool.query('DELETE FROM match_user where user_id = ? AND match_id = ?', [myId, joined[0]["match_id"]]);
    return parseInt(joined[0]["match_id"]);
}

async function createMatch(groupId) {
    const [result] = await pool.query('INSERT INTO \`match\` (group_id) VALUES (?)', [groupId]);
    return result.insertId;
}

async function joinMatch(user_list) {
    const groupId = user_list[0]["group_id"];
    const matchId = await createMatch(groupId);
    for (let i = 0; i < user_list.length; i++) {
        await pool.query('INSERT INTO match_user (user_id, match_id) VALUES (?, ?)', [user_list[i]["user_id"], matchId]);
    }
    return matchId;
}

module.exports = {
    getMatch,
    leaveMatch,
    createMatch,
    joinMatch
}

const pool = require('./db').pool;

async function getMatchId(group_id, user_id) {

    let query = `
    WITH USER_TABLE AS (SELECT match_id FROM match_user WHERE user_id = ?),
    SELECT id AS match_id FROM match WHERE group_id = ? 
    AND id IN (SELECT match_id FROM USER_TABLE)
    `;

    let result;

    try {
        [result] = await pool.query(query, [group_id, user_id]);
    } catch (err) {
        throw err;
    }

    if (result.length === 0) {
        return null;
    }

    return result[0].match_id;

}

async function createMessage(match_id, message, user_id) {

    let query = `
    INSERT INTO chat (matched_id, user_id, message) VALUES (?, ?, ?)
    `;

    let result;

    try {
        [result] = await pool.query(query, [match_id, user_id, message]);
    } catch (err) {
        throw err;
    }

    return result.insertId;

}

async function getMessages(match_id, cursor) {

    let query = `
        SELECT chat.id AS chat_id, chat.message AS message, chat.user_id AS user_id, chat.created_at AS created_at, user.picture AS picture, user.name AS nickname
        FROM chat LEFT JOIN user ON chat.user_id = user.id
        WHERE chat.matched_id = ? AND chat.id < ?
        ORDER BY chat.id DESC LIMIT 25
        `;

    let result;

    try {
        [result] = await pool.query(query, [match_id, cursor]);
    } catch (err) {
        throw err;
    }

    let next_cursor = 0;

    if (result.length > 0) {
        next_cursor = result[result.length - 1].chat_id;
    }

    return {
        chats: result,
        next_cursor: next_cursor
    };

}

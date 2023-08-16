const model = require('../Model/chat_model.js');

async function createMessage(req, res) {
    let group_id = req.params.group_id;
    let message = req.body.message;
    let user_id = req.authorization_id;

    let match_id = await model.getMatchId(group_id, user_id);

    if (!match_id) {
        return res.status(400).json({
            error: "The user is not in the group or the group is not matched."
        });
    }

    let chat_id;

    try {
        chat_id = await model.createMessage(match_id, message, user_id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }

    return res.status(200).json({
        chat_id: chat_id
    });

}

async function getMessages(req, res) {

    let group_id = req.params.group_id;
    let cursor = req.query.cursor;
    let user_id = req.authorization_id;

    if (!cursor) {
        cursor = 2147483647;
    }

    let match_id = await model.getMatchId(group_id, user_id);

    if (!match_id) {
        return res.status(400).json({
            error: "The user is not in the group or the group is not matched."
        });
    }

    let chats;
    let next_cursor;

    try {
        let result = await model.getMessages(match_id, cursor);
        chats = result.chats;
        next_cursor = result.next_cursor;
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }

    return res.status(200).json({
        chats: chats,
        next_cursor: next_cursor
    });

}

module.exports = {
    createMessage,
    getMessages
}

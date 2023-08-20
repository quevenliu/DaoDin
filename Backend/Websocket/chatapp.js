const chatModel = require('../Model/chat_model');
const matchModel = require('../Model/match_model');
const userModel = require('../Model/user_model');
const groupModel = require('../Model/group_model');

async function processChat(connection) {

    if (!connection.match) {
        connection.match = await matchModel.getMatch(connection.authorization_id, connection.group_id);
    }

    if (!connection.user) {
        connection.user = await userModel.getUser("id", connection.authorization_id);
    }

    if (!connection.membership) {
        connection.membership = await groupModel.getMembership(connection.authorization_id, connection.group_id);
    }

    if (!connection.match || !connection.user || !connection.membership) {
        connection.status(400).json({ error: "Invalid group_id" });
        return;
    }

    connection.body = {
        message: connection.body.message,
        user_id: connection.authorization_id,
        sent_at: new Date().toISOString(),
        picture: connection.user.picture,
        nickname: connection.membership.nickname
    }

    chatModel.createMessage(connection.match.matched_group_id, connection.body.message, connection.authorization_id);

    return;
}

function filterClients(clients, user_list) {
    if (!clients || !user_list) {
        return;
    }
    return [...clients].filter(client => user_list.includes(client.authorization_id));
}

function groupFilterer(connection) {
    if (!connection.match.users) {
        connection.status(400).json({ error: "Invalid group_id, no match can be found." });
        return;
    }
    return connection.match.users.map(user => user.user_id).filter(user_id => user_id !== connection.authorization_id);
}

module.exports = {
    processChat,
    filterClients,
    groupFilterer
}
const chatModel = require('../Model/chat_model');
const matchModel = require('../Model/match_model');
const userModel = require('../Model/user_model');
const groupModel = require('../Model/group_model');
const { format_date } = require('../utils/utils');

async function init() {
    this.matchConnectionMap = new Map();
}

function onClose(connection) {
    if (!connection.match) { return; }
    if (this.matchConnectionMap.has(connection.match.matched_group_id)) {
        const index = this.matchConnectionMap.get(connection.match.matched_group_id).indexOf(connection);
        if (index > -1) {
            this.matchConnectionMap.get(connection.match.matched_group_id).splice(index, 1);
        }
    }
    connection.authorization_id = undefined;
}

async function processMetadata(connection) {

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

    if (!this.matchConnectionMap.has(connection.match.matched_group_id)) {
        this.matchConnectionMap.set(connection.match.matched_group_id, []);
    }
    else {
        this.matchConnectionMap.get(connection.match.matched_group_id).push(connection);
    }
}

async function processMessage(connection) {
    let timenow = new Date().toISOString();
    timenow = format_date(timenow);

    connection.body = {
        message: connection.body.message,
        user_id: connection.authorization_id,
        sent_at: timenow,
        picture: connection.user.picture,
        nickname: connection.membership.nickname
    }

    chatModel.createMessage(connection.match.matched_group_id, connection.body.message, connection.authorization_id);

    return;
}

function filterClients(clients, connection) {
    return this.matchConnectionMap.get(connection.match.matched_group_id);
}

module.exports = {
    processMetadata,
    processMessage,
    filterClients,
    init,
    onClose
}
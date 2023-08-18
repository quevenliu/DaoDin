const chatModel = require('../Model/chat_model');

function processChat(message, user_id) {

}

function filterClients(clients, user_list) {
    return clients.filter(client => user_list.includes(client.userID));
}

function groupFilterer(userID) {
    return client => client.userID !== userID;
}

module.exports = {
    processChat,
    filterClients,
    groupFilterer
}
const { createDiffieHellmanGroup } = require('crypto');
const model = require('../Model/group_model');
const RabbitMQ = require('../pubsub');

const getEvent = async (req, res) => {   
    const myId = req.authorization_id;
    const channel = await RabbitMQ.connect();
    const message = await RabbitMQ.consumeMessagesFromQueue(`user_${myId}_queue`);
    console.log(message);
    return res.status(200).json(message);

}


module.exports = {
    getEvent
}
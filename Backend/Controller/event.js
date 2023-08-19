const model = require('../Model/group_model');
const RabbitMQ = require('../pubsub');

const getEvent = async (req, res) => {   
    const myId = req.authorization_id;
    const channel = await RabbitMQ.connect();
    const groupIdList = await RabbitMQ.consumeMessagesFromQueue(channel,`user_${myId}_queue`);
    const data =[]; 
    for (let i = 0; i < groupIdList.length; i++) {
        const group = await model.getGroup(groupIdList[i]);
        const event = {
            "group_id": group.group_id,
            "name": group.name,
            "category": group.category,
            "location": group.location,
            "message" : `${group.name} has been approved, you can join now!`,
        }
        data.push(event);
    }
    res.status(200).send(JSON.stringify({ "event": data }));
    

}


module.exports = {
    getEvent
}
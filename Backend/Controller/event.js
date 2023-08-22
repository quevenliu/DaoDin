const model = require('../Model/event_model');
const RabbitMQ = require('../pubsub');
const  moment = require('moment-timezone');
moment.tz.setDefault("Asia/Taipei");
const getEvent = async (req, res) => {   
    const myId = req.authorization_id;
    const channel = await RabbitMQ.connect();
    const groupIdList = await RabbitMQ.consumeAllMessagesFromQueue(channel,`user_${myId}_queue`); 
    const data = await model.getEvent(myId, groupIdList);
    const events = data.map((event) => {          
        const taipeiDateTime = moment.utc(event["created_at"]).tz('Asia/Taipei');
		const formattedDate = taipeiDateTime.format('YYYY-MM-DD HH:mm:ss');	
 
        return {
            "event_id": event.id,
            "group_id": event.group_id,
            "name": event.name,
            "category": event.category,
            "location": event.location,
            "description": event.description,
            "creator_id": event.creator_id,
            "picture": event.picture,
            "is_read": event.is_read,
            "message" : `${event.name} has been matched, you can join now!`,
            "created_at" : formattedDate,
        }
    });
        

    res.status(200).send(JSON.stringify({"events": events}));
    

}
const readEvent = async (req, res) => {
    try{
        const myId = req.authorization_id;
        const eventId = req.params.event_id;
        const id = await model.readEvent(myId, eventId);
        if(!id) return res.status(400).send(JSON.stringify({"message": "can't read this event"}));
        res.status(200).send(JSON.stringify({"event_id": id}));
    }catch(error){  
        res.status(500).send(JSON.stringify({"message": error.message}));
        
    }
}

module.exports = {
    getEvent,   
    readEvent
}
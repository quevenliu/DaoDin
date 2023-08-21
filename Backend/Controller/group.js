const model = require('../Model/group_model');
const match_model = require('../Model/match_model');
const axios = require('axios');
const RabbitMQ = require('../pubsub');
const MATCH_THRESHOLD = 13;
const createGroup = async (req, res) => {

    let imageUrl = null;
    if (req.file) {

        imageUrl = `https://${process.env.PUBLIC_IP}/static/` + req.fileName;
    }
   // else { return res.status(400).json({error:"file upload error"});}
    let myId = req.authorization_id;
    let id;
    try {
        id = await model.createGroup(myId, req.body.name, req.body.category, req.body.location, req.body.description, imageUrl);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
    if (id === false) {
        res.status(400).send(JSON.stringify({ "error": "can't create" }));
        return;
    }
    const channel = await RabbitMQ.connect();
    await RabbitMQ.createGroupExchange(channel, id);
    res.status(200).send(JSON.stringify({ group_id: id }));
}
const getGroup = async (req, res) => {
    const groupId = req.params.group_id;
    if (!groupId) {
        res.status(400).send(JSON.stringify({ "error": "No group ID" }));
        return;
    }
    let data;
    try {
        data = await model.getGroup(groupId);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
    if (data === false) {
        res.status(400).send(JSON.stringify({ "error": "can't get" }));
        return;
    }
    res.status(200).send(JSON.stringify(data));
}

const updateGroup = async (req, res) => {
    let imageUrl = null;
    if (req.file) {

        imageUrl = `https://${process.env.PUBLIC_IP}/static/` + req.fileName;
    }
    else { return res.status(400).json({ error: "file upload error" }); }
    const groupId = req.params.group_id;
    let id;
    try {
        id = await model.updateGroup(req.authorization_id, groupId, req.body.name, req.body.category, req.body.location, req.body.description, imageUrl);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
    if (id === false) {
        res.status(400).send(JSON.stringify({ "error": "can't update" }));
        return;
    }
    res.status(200).send(JSON.stringify({ group_id: id }));
}


const match = async (groupId) => {

    try {
        const member_data = await model.getAllMembers(groupId);

        const match_result = await axios.post(`http://${process.env.MATCH_IP}:${process.env.MATCH_PORT}/`, {
            data: member_data
        });


        const match_data = match_result.data.data;

        for (let i = 0; i < match_data.length; i++) {
            const matchId = await match_model.createMatch(groupId);
            const users = match_data[i];
            await match_model.joinMatch(users, matchId);
        }
    } catch (err) {
        console.log(err);
    }
}

const match_random = (member_data) => {

    const match_data = [];
    const member_count = member_data.length;
    const match_count = Math.floor(member_count / MATCH_THRESHOLD);
    const remain_count = member_count % MATCH_THRESHOLD;

    for (let i = 0; i < match_count; i++) {
        const match = [];
        for (let j = 0; j < MATCH_THRESHOLD; j++) {
            const random_index = Math.floor(Math.random() * member_data.length);
            match.push(member_data[random_index].user_id);
            member_data.splice(random_index, 1);
        }
        match_data.push(match);
    }

    if (remain_count > 0) {
        const match = [];
        for (let i = 0; i < remain_count; i++) {
            const random_index = Math.floor(Math.random() * member_data.length);
            match.push(member_data[random_index].user_id);
            member_data.splice(random_index, 1);
        }
        match_data.push(match);
    }

    return {
        data:
        {
            data: match_data
        }
    };

}

const joinGroup = async (req, res) => {
    const myId = req.authorization_id;
    const groupId = req.params.group_id;
    const group = await model.getGroup(groupId);

    if (group.status =='complete') {
        res.status(400).send(JSON.stringify({ "error": "can't join" }));
        return;
    }
    let id, group_member_count;
    try {
        id = await model.joinGroup(myId, groupId, req.body.nickname, req.body.self_intro, req.body.match_msg);

        if (id === false) {
            res.status(400).send(JSON.stringify({ "error": "can't join" }));
            return;
        }
        const channel = await RabbitMQ.connect();
        await RabbitMQ.bindUserQueueToExchange(channel, `user_${myId}_queue`, `group_${groupId}_exchange`);
        group_member_count = await model.getGroupMemberCount(groupId);

        if (group_member_count > MATCH_THRESHOLD) {
            await model.switchToComplete(groupId);
            match(groupId);
            const channel = await RabbitMQ.connect();
            await RabbitMQ.sendNotificationToExchange(channel, `group_${groupId}_exchange`, { group_id: groupId });
        
        }
    }catch (err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
    res.status(200).send(JSON.stringify({ group_id: id }));
    
    

}
const leaveGroup = async (req, res) => {
    const myId = req.authorization_id;
    const groupId = req.params.group_id;
    let id1, id2;
    try {
        id1 = await match_model.leaveMatch(myId, groupId);
        id2 = await model.leaveGroup(myId, groupId);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }

    if (id1 === false && id2 === false) {
        res.status(400).send(JSON.stringify({ "error": "can't leave" }));
        return;
    }
    const channel = await RabbitMQ.connect();
    await RabbitMQ.unbindUserQueueFromExchange(channel, `user_${myId}_queue`, `group_${groupId}_exchange`);
    res.status(200).send(JSON.stringify({ group_id: id2 }));
}


const searchGroup = async (req, res) => {
    const category = req.query.category
    const location = req.query.location;
    const sort = req.query.sort;
    const joined = req.query.isJoined;
    const cursor = req.query.cursor;
    const myId = req.authorization_id;
    const creatorId = req.query.creator_id;
    try {
        if (cursor !== undefined) {
            const decodedString = Buffer.from(cursor, "base64").toString();
            if (isNaN(parseInt(decodedString))) {
                res.status(400).send(JSON.stringify({ "error": "can't search" }));
                return;
            }
            groups = await model.searchGroup(category, location, sort, joined, parseInt(decodedString), myId, creatorId);

        } else {
            groups = await model.searchGroup(category, location, sort, joined, cursor, myId, creatorId);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }

    res.status(200).send(JSON.stringify(groups));
}


module.exports = {
    createGroup,
    getGroup,
    updateGroup,
    joinGroup,
    leaveGroup,
    searchGroup
};
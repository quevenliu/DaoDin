const model = require('../Model/group_model');
const match_model = require('../Model/match_model');
const axios = require('axios');

const MATCH_THRESHOLD = 13;

const createGroup = async (req, res) => {

    let imageUrl = null;
    if (!req.file) {

        imageUrl = `https://${process.env.PUBLIC_IP}/static/` + req.fileName;
    }
    let myId = req.authorization_id;
    const id = await model.createGroup(myId, req.body.name, req.body.category, req.body.location, req.body.description, imageUrl);
    if (id === false) {
        res.status(400).send(JSON.stringify({ "error": "can't create" }));
        return;
    }
    res.status(200).send(JSON.stringify({ group_id: id }));
}
const getGroup = async (req, res) => {
    const groupId = req.params.group_id;
    const data = await model.getGroup(groupId);
    if (data === false) {
        res.status(400).send(JSON.stringify({ "error": "can't get" }));
        return;
    }
    res.status(200).send(JSON.stringify(data));
}

const updateGroup = async (req, res) => {
    const groupId = req.params.group_id;

    const id = await model.updateGroup(req.authorization_id, groupId, req.body.name, req.body.category, req.body.location, req.body.description, req.body.picture);
    if (id === false) {
        res.status(400).send(JSON.stringify({ "error": "can't update" }));
        return;
    }
    res.status(200).send(JSON.stringify({ group_id: id }));
}

const joinGroup = async (req, res) => {
    const myId = req.authorization_id;
    const groupId = req.params.group_id;
    const id = await model.joinGroup(myId, groupId, req.body.nickname, req.body.self_intro, req.body.match_msg);

    const group_member_count = await model.getGroupMemberCount(groupId);
    if (group_member_count > MATCH_THRESHOLD) {
        const member_data = await model.getAllMembers(groupId);
        const match_result = await axios.post(`http://${process.env.MATCH_IP}:${process.env.MATCH_PORT}/`, {
            data: member_data
        });
        const match_data = match_result.data.data;
        for (let i = 0; i < match_data.length; i++) {
            const match = match_data[i];
            await match_model.joinMatch(match);
        }
    }

    if (id === false) {
        res.status(400).send(JSON.stringify({ "error": "can't join" }));
        return;
    }
    res.status(200).send(JSON.stringify({ group_id: id }));

}
const leaveGroup = async (req, res) => {
    const myId = req.authorization_id;
    const groupId = req.params.group_id;
    const id1 = await match_model.leaveMatch(myId, groupId);
    const id2 = await model.leaveGroup(myId, groupId);
    if ((id1 && id2) === false) {
        res.status(400).send(JSON.stringify({ "error": "can't leave" }));
        return;
    }
    res.status(200).send(JSON.stringify({ group_id: id }));
}


const searchGroup = async (req, res) => {
    const catagory = req.query.catagory
    const location = req.query.location;
    const sort = req.query.sort;
    const joined = req.query.isJoined;
    const cursor = req.query.cursor;
    const myId = req.authorization_id;

    if (cursor !== undefined) {
        const decodedString = Buffer.from(cursor, "base64").toString();
        if (isNaN(parseInt(decodedString))) {
            res.status(400).send(JSON.stringify({ "error": "can't search" }));
            return;
        }
        groups = await model.searchGroup(catagory, location, sort, joined, parseInt(decodedString), myId);

    } else {
        groups = await model.searchGroup(catagory, location, sort, joined, cursor, myId);
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
const model = require('../Model/match_model');

const getMatch = async (req, res) => {
  const myId = req.authorization_id;
  const groupId = req.params.group_id;
  const data = await model.getMatch(myId, groupId);
  if (data === false) {
    res.status(400).send(JSON.stringify({ "error": "can't get" }));
    return;
  }
  res.status(200).send(JSON.stringify(data));
}
const leaveMatch = async (req, res) => {
  const myId = req.authorization_id;
  const groupId = req.params.group_id;
  const id = await model.leaveMatch(myId, groupId);
  if (id === false) {
    res.status(400).send(JSON.stringify({ "error": "can't leave" }));
    return;
  }
  res.status(200).send(JSON.stringify({ "subgroup_id": id }));
}

module.exports = {
  getMatch,
  leaveMatch
};

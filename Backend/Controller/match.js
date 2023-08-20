const model = require('../Model/match_model');

const getMatch = async (req, res) => {
  const myId = req.authorization_id;
  const groupId = req.params.group_id;
  try {
    const data = await model.getMatch(myId, groupId);
    if (data === false) {
      res.status(400).send(JSON.stringify({ "error": "can't get" }));
      return;
    }
    return res.status(200).send(JSON.stringify(data));
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal server error');
  }
}
const leaveMatch = async (req, res) => {
  const myId = req.authorization_id;
  const groupId = req.params.group_id;
  try {
    const id = await model.leaveMatch(myId, groupId);
    if (id === false) {
      res.status(400).send(JSON.stringify({ "error": "can't leave" }));
      return;
    }
    return res.status(200).send(JSON.stringify({ "subgroup_id": id }));
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal server error');
  }
}

module.exports = {
  getMatch,
  leaveMatch
};

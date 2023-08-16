const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authorization } = require('../utils/authorization');

app.use(express.json());

app.use(authorization);

app.post('/:group_id', chatController.createMessage);

app.get('/:group_id', chatController.getMessages);

module.exports = router;

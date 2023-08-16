const express = require('express');
const router = express.Router();
const chatController = require('../Controller/chat');
const { authorization } = require('../utils/authorization');

router.use(express.json());

router.use(authorization);

router.post('/:group_id', chatController.createMessage);

router.get('/:group_id', chatController.getMessages);

module.exports = router;

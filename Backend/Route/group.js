const express = require('express');
const router = express.Router();
const groupController = require('../Controller/group');
const authorization = require('../utils/authorization').authorization;
const { upload } = require('../utils/multer');

router.use(express.json());
router.use(authorization);
router.post('/',upload.single('picture'), groupController.createGroup);
router.get('/search', groupController.searchGroup);
router.get('/:group_id', groupController.getGroup);
router.put('/:group_id', groupController.updateGroup);
router.post('/:group_id/join', groupController.joinGroup);
router.post('/:group_id/leave', groupController.leaveGroup);
module.exports = router;
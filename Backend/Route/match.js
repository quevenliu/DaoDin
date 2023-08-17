const express = require('express');
const router = express.Router();
const matchController = require('../Controller/match');
const authorization = require('../utils/authorization').authorization;
const { upload } = require('../utils/multer');

router.use(express.json());
router.use(authorization);
router.get('/:group_id', matchController.getMatch);
module.exports = router;
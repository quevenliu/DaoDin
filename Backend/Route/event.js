const express = require('express');
const router = express.Router();
const { authorization } = require('../utils/authorization');
const eventController = require('../Controller/event');
router.use(express.json());
router.use(authorization);

router.get('/', eventController.getEvent);


module.exports = router;
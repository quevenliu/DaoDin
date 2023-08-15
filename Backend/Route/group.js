const express = require('express');
const groupRouter = express.Router();
const groupController = require('../Controller/group');
const upload = require('../utils/multer')

groupRouter.use(express.json());
groupRouter.post('/',upload.single('picture'), groupController.createGroup);
groupRouter.get('/', groupController.create);
groupRouter.post('/', groupController.create);

module.exports = groupRouter;
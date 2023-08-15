const express = require('express');
const router = express.Router();
const authorization = require('../utils/authorization');
const controller = require('../controllers/user');

app.use(express.json());

app.post('/signup', controller.signup);
app.post('/signin', controller.signin);

app.use(authorization);

app.put('/profile', controller.updateProfile);
app.put('/profile/picture', controller.updateProfilePicture);
app.get('/profile', controller.getProfile);

module.exports = router;
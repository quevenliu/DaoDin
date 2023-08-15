const express = require('express');
const userRouter = require('./Route/user');
const groupRouter = require('./Route/group');
const chatRouter = require('./Route/chat');
const matchRouter = require('./Route/match');

const app = express();

app.use('/health', (req, res) => {
    return res.status(200).send('OK');
});

app.use(express.json());

app.use('api/user', userRouter);
app.use('api/group', groupRouter);
app.use('api/chat', chatRouter);
app.use('api/match', matchRouter);

module.exports = { app };
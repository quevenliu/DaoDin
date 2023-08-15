const express = require('express');
const userRouter = require('./user');
const groupRouter = require('./group');
const chatRouter = require('./chat');
const matchRouter = require('./match');

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
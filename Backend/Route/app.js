const express = require('express');
const cors = require('cors');
const userRouter = require('./user');
const groupRouter = require('./group');
const chatRouter = require('./chat');
const matchRouter = require('./match');

require('dotenv').config('../.env');

const app = express();

const corsOptions = {
    origin: 'http://127.0.0.1:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(express.json());

app.get('/health', (req, res) => {
    return res.status(200).send('OK');
});

app.use('/static', express.static(process.env.UPLOAD_PATH));

app.use('/api/user', userRouter);
app.use('/api/group', groupRouter);
app.use('/api/chat', chatRouter);
app.use('/api/match', matchRouter);


module.exports = { app };
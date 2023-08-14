const express = require('express');
const app = express();

app.use('/health', (req, res) => {
    return res.status(200).send('OK');
});

app.use(express.json());

module.exports = { app };
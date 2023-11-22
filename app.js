'use strict';
require('dotenv').config();
const config = require('./config/config.js');
const response = require('./utilities/response.js');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const accountRouter = require('./router/account');
const userRouter = require('./router/user');
const eventRouter = require('./router/event');

app.use('/api/account', accountRouter);
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);

app.get('/api/health-check', (req, res) => {
    return response.sendSuccess(res, 'api running smoothly', 200);
});

app.use((error, req, res, next) => {
    return response.sendFatal(error, req, res, next);
});

app.listen(config.port, config.host, () => {
    console.log(`Server started and running at port ${config.port}`);
});

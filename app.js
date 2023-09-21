'use strict';
require('dotenv').config();
const config = require('./config/config.js');
const response = require('./utilities/response.js');
const express = require('express');
const cors = require('cors');
const app = express();

const sequelize = require('./models/index.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const accountRouter = require('./router/account');

app.use('/api/account', accountRouter);

app.get('/api/health-check', (req, res) => {
    return response.sendSuccess(res, 'api running smoothly', 200);
});

app.listen(config.port, config.host, () => {
    console.log(`Server started and running at port ${config.port}`);
});

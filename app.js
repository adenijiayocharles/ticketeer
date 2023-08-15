'use strict';
global.__basedir = __dirname;
const config = require('./config/config.js');
const response = require('./utilities/response.js');
const express = require('express');
const app = express();

app.get('/health-check', (req, res) => {
    return response.success(res, 'api running smoothly', 200);
});

app.listen(config.PORT, config.HOST, () => {
    console.log(`Server started and running at port ${config.PORT}`);
});

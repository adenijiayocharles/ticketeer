'use strict';

require('dotenv').config();
const config = require('./config/config.js');
const response = require('./utilities/Response.js');
const express = require('express');
const app = express();

app.get('/health-check', (req, res) => {
    return response.success(res, 'api running smoothly', 200);
});

app.listen(config.port, config.host, () => {
    console.log(`Server started and running at port ${config.port}`);
});

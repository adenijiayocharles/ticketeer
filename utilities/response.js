'use strict';
require('dotenv').config();
const status = require('http-status');

const sendResponse = (req, res, status, statusCode, message, data) => {
    return res.status(statusCode).json({ success: status, message, data });
};

const sendFatal = (error, req, res) => {
    let errorObject = {
        success: false,
        message: 'Oops, Internal Server Error.',
    };

    if (process.env.NODE_ENV === 'development') {
        errorObject = {
            ...errorObject,
            stack: error.stack,
        };
    }

    return res.status(status.INTERNAL_SERVER_ERROR).send(errorObject);
};

module.exports = { sendFatal, sendResponse };

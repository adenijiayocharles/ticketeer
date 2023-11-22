'use strict';
require('dotenv').config();
const status = require('http-status');

const sendSuccess = (
    res,
    message = 'Operation successful',
    statusCode = status.OK,
    body = {}
) => {
    return res.status(statusCode).json({ success: true, message, ...body });
};

const sendError = (
    res,
    message = 'Operation failed',
    statusCode = status.BAD_REQUEST,
    body = {}
) => {
    return res.status(statusCode).json({ success: false, message, ...body });
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

module.exports = { sendSuccess, sendError, sendFatal };

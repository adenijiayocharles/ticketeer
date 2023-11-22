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
    return res.status(status.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'Oops, something went wrong',
        error: error.errors,
        stack: error.stack,
    });
};

module.exports = { sendSuccess, sendError, sendFatal };

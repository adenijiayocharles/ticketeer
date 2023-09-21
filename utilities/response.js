'use strict';
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

const sendFatal = (
    res,
    message = 'Oops, something went wrong',
    statusCode = status.INTERNAL_SERVER_ERROR,
    body = {},
    error,
    stack
) => {
    return res
        .status(statusCode)
        .send({ success: false, message, ...body, error, stack });
};

module.exports = { sendSuccess, sendError, sendFatal };

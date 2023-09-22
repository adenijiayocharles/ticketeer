'use strict';
require('dotenv').config();
const response = require('../utilities/response');
const tokenizer = require('../utilities/tokenizer');
const httpStatus = require('http-status');

const verifyUser = (req, res, next) => {
    const token = req.headers['Authorization'];

    if (!token) {
        return response.sendError(
            res,
            'Token does not exist',
            httpStatus.UNAUTHORIZED
        );
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    } else {
        return response.sendError(
            res,
            "Authorization token not found. Token must start with 'Bearer'",
            httpStatus.UNAUTHORIZED
        );
    }

    try {
        const decoded = tokenizer.verifyToken(token);
        req.user = decoded;
    } catch (err) {
        return response.sendError(res, 'Invalid Token', httpStatus.BAD_REQUEST);
    }

    return next();
};

module.exports = verifyUser;

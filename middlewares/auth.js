'use strict';
require('dotenv').config();
const response = require('../utilities/response');
const tokenizer = require('../utilities/tokenizer');
const httpStatus = require('http-status');

const verifyUser = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return response.sendError(
            res,
            'Authorization token not found',
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
        return response.sendError(
            res,
            'Invalid Authorization Token',
            httpStatus.UNAUTHORIZED
        );
    }

    return next();
};

module.exports = verifyUser;

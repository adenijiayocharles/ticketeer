'use strict';
require('dotenv').config();
const response = require('../utilities/response');
const tokenizer = require('../utilities/tokenizer');
const httpStatus = require('http-status');

const verifyUser = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return response.sendResponse(
            req,
            res,
            false,
            httpStatus.UNAUTHORIZED,
            'Authorization token not found'
        );
    }

    if (!token.startsWith('Bearer ')) {
        return response.sendResponse(
            req,
            res,
            false,
            httpStatus.UNAUTHORIZED,
            "Authorization token not found. Token must start with 'Bearer'"
        );
    }

    token = token.slice(7, token.length);

    try {
        const decoded = tokenizer.verifyToken(token);
        req.user = decoded;
    } catch (error) {
        next(error);
    }

    return next();
};

module.exports = verifyUser;

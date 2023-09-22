'use strict';
require('dotenv').config();
const response = require('../utilities/response');
const tokenizer = require('../utilities/tokenizer');

const verifyToken = (req, res, next) => {
    const token = req.headers['Authoriztion Token'];

    if (!token) {
        return response.sendError(
            res,
            'Token does not exist',
            httpStatus.BAD_REQUEST
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

module.exports = verifyToken;

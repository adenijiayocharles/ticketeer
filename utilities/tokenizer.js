'use strict';
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.AUTH_TOKEN;

const generateToken = (userData) => {
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: userData,
        },
        secret
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };

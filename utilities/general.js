'use strict';
const { randomBytes } = require('crypto');

const generateRandomId = () => {
    return randomBytes(16).toString('hex');
};

module.exports = { generateRandomId };

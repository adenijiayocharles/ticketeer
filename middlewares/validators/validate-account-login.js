'use strict';
const Joi = require('joi');
const httpStatus = require('http-status');
const response = require('../../utilities/response');

const validation = Joi.object({
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
}).options({ abortEarly: false, allowUnknown: true });

const loginValidation = async (req, res, next) => {
    const { error } = validation.validate(req.body);
    if (error) {
        return response.sendError(res, httpStatus.BAD_REQUEST, error.message);
    } else {
        next();
    }
};
module.exports = loginValidation;

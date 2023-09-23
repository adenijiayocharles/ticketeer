'use strict';
const Joi = require('joi');
const httpStatus = require('http-status');
const response = require('../../utilities/response');

const validation = Joi.object({
    first_name: Joi.string().trim(true).required(),
    last_name: Joi.string().trim(true).required(),
}).options({ abortEarly: false, allowUnknown: true });

const profileUpdateValidation = async (req, res, next) => {
    const { error } = validation.validate(req.body);
    if (error) {
        return response.sendError(res, error.message, httpStatus.BAD_REQUEST);
    } else {
        next();
    }
};
module.exports = profileUpdateValidation;
'use strict';
const Joi = require('joi');
const httpStatus = require('http-status');
const response = require('../../utilities/response');

const validation = Joi.object({
    email: Joi.string().email().trim(true).required(),
    reset_code: Joi.string().trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
    password_confirmation: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match with password' }),
}).options({ abortEarly: false, allowUnknown: true });

const passwordChangeValidation = async (req, res, next) => {
    const { error } = validation.validate(req.body);
    if (error) {
        return response.sendError(res, error.message, httpStatus.BAD_REQUEST);
    } else {
        next();
    }
};
module.exports = passwordChangeValidation;

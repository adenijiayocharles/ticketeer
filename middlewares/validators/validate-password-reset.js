'use strict';
const Joi = require('joi');
const httpStatus = require('http-status');
const response = require('../../utilities/response');

const validation = Joi.object({
    email: Joi.string().email().trim(true).required(),
}).options({ abortEarly: false, allowUnknown: false });

const passwordResetValidation = async (req, res, next) => {
    const { error } = validation.validate(req.body);
    if (error) {
        return response.sendResponse(
            res,
            false,
            httpStatus.BAD_REQUEST,
            error.message
        );
    } else {
        next();
    }
};
module.exports = passwordResetValidation;

'use strict';
const Joi = require('joi');
const httpStatus = require('http-status');
const response = require('../../utilities/response');

const validation = Joi.object({
    name: Joi.string().trim(true).required(),
    description: Joi.string().trim(true),
    type: Joi.string().trim(true).required(),
    start_date: Joi.date().required(),
    start_time: Joi.string().required(),
    end_date: Joi.date().required(),
    end_time: Joi.string().required(),
    location_type: Joi.string().trim(true).required(),
    location: Joi.alternatives().conditional('location_type', {
        is: 'physical',
        then: Joi.string().required(),
        otherwise: Joi.optional(),
    }),
}).options({ abortEarly: false, allowUnknown: true });

const createEventValidation = async (req, res, next) => {
    const { error } = validation.validate(req.body);
    if (error) {
        return response.sendError(res, error.message, httpStatus.BAD_REQUEST);
    } else {
        next();
    }
};

module.exports = createEventValidation;

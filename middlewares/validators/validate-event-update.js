'use strict';
const Joi = require('joi');
const httpStatus = require('http-status');
const response = require('../../utilities/response');

const validation = Joi.object({
    name: Joi.string().trim(true).optional(),
    description: Joi.string().trim(true),
    type: Joi.string().trim(true).optional(),
    start_date: Joi.date().optional(),
    start_time: Joi.string().optional(),
    end_date: Joi.date().optional(),
    end_time: Joi.string().optional(),
    location_type: Joi.string().trim(true).optional(),
    location: Joi.alternatives().conditional('location_type', {
        is: 'physical',
        then: Joi.string().required(),
        otherwise: Joi.optional(),
    }),
}).options({ abortEarly: false, allowUnknown: false });

const updateEventValidation = async (req, res, next) => {
    const { error } = validation.validate(req.body);
    if (error) {
        return response.sendResponse(
            req,
            res,
            false,
            httpStatus.BAD_REQUEST,
            error.message
        );
    } else {
        next();
    }
};

module.exports = updateEventValidation;

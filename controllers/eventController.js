'use strict';
const { Event } = require('../models');
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');

const response = require('../utilities/response');

const create = async (req, res, next) => {
    try {
        await Event.create({
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            start_date: req.body.start_date,
            start_time: req.body.start_time,
            end_date: req.body.end_date,
            end_time: req.body.end_time,
            location_type: req.body.location_type,
            location: req.body.location,
            created_by: req.user.data.id,
        });

        return response.sendSuccess(
            res,
            'Event created successfully',
            httpStatus.CREATED
        );
    } catch (error) {
        next(error);
    }
};

module.exports = { create };

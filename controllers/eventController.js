'use strict';
const { Event } = require('../models');
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const { isBefore } = require('date-fns');
const response = require('../utilities/response');

const create = async (req, res, next) => {
    try {
        const startDate = new Date(req.body.start_date);
        const endDate = new Date(req.body.end_date);

        if (isBefore(endDate, startDate)) {
            return response.sendError(
                res,
                'Start date must start before end date',
                httpStatus.BAD_REQUEST
            );
        }

        const event = await Event.create({
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
            httpStatus.CREATED,
            { event }
        );
        console.log(44);
    } catch (error) {
        next(error);
    }
};

const findAll = async (req, res, next) => {
    try {
        const data = await Event.findAll({
            where: { created_by: req.user.data.id },
        });

        if (data) {
            return response.sendSuccess(res, 'Events found', httpStatus.OK, {
                data,
            });
        } else {
            return response.sendSuccess(
                res,
                'No created events yet',
                httpStatus.OK
            );
        }
    } catch (error) {
        next(error);
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.destroy({
            where: { uuid: req.params.id, created_by: req.user.data.id },
        });

        if (event) {
            return response.sendSuccess(
                res,
                'Event deleted successfully',
                httpStatus.OK
            );
        } else {
            return response.sendSuccess(
                res,
                'Unable to delete event. Please try again later',
                httpStatus.OK
            );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { create, deleteEvent, findAll };

'use strict';
const { Event } = require('../models');
const httpStatus = require('http-status');
const { isBefore } = require('date-fns');

class EventService {
    constructor() {
        this.response = {};
        this.eventModelInstance = Event;
    }

    async create(data) {
        let startDateTime = new Date(data.start_date + ' ' + data.start_time);
        let endDateTime = new Date(data.end_date + ' ' + data.end_time);

        if (isBefore(endDateTime, startDateTime)) {
            return {
                status: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Start date must start before end date.',
            };
        }

        await this.eventModelInstance.create({
            name: data.name,
            description: data.description,
            type: data.type,
            start_date: data.start_date,
            start_time: data.start_time,
            end_date: data.end_date,
            end_time: data.end_time,
            location_type: data.location_type,
            location: data.location,
            created_by: data.user_id,
        });

        return {
            status: true,
            statusCode: httpStatus.CREATED,
            message: 'Event created successfully.',
        };
    }

    async findAll(data) {
        const results = await this.eventModelInstance.findAll({
            where: { created_by: data.userId },
        });

        if (!results) {
            return {
                status: false,
                statusCode: httpStatus.OK,
                message: 'No created events yet.',
            };
        }

        return {
            status: true,
            statusCode: httpStatus.OK,
            message: 'Events found.',
            data: results,
        };
    }

    async findOne(data) {
        const result = await this.eventModelInstance.findOne({
            where: { created_by: data.userId, uuid: data.uuid },
        });

        if (!result) {
            return {
                status: false,
                statusCode: httpStatus.OK,
                message: 'Event not found.',
            };
        }

        return {
            status: true,
            statusCode: httpStatus.OK,
            message: 'Event found.',
            data: result,
        };
    }

    async update(data) {
        const result = await this.eventModelInstance.update(data, {
            where: { created_by: data.userId, uuid: data.uuid },
        });

        if (!result[0]) {
            return {
                status: false,
                statusCode: httpStatus.OK,
                message: 'Event not found. Update failed',
            };
        }

        const event = await this.eventModelInstance.findOne({
            where: { created_by: data.userId, uuid: data.uuid },
        });

        return {
            status: true,
            statusCode: httpStatus.OK,
            message: 'Update successful',
            data: event,
        };
    }

    async delete(data) {
        const event = await this.eventModelInstance.destroy({
            where: { uuid: data.uuid, created_by: data.userId },
        });

        if (!event) {
            return {
                status: false,
                statusCode: httpStatus.OK,
                message: 'Unable to delete event. Please try again later',
            };
        }

        return {
            status: true,
            statusCode: httpStatus.OK,
            message: 'Event deleted successfully',
        };
    }
}

module.exports = new EventService();

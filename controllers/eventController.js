'use strict';
const response = require('../utilities/response');
const eventService = require('../services/eventService');

const create = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            user_id: req.user.data.id,
        };

        const result = await eventService.create(data);
        return response.sendResponse(
            req,
            res,
            result.status,
            result.statusCode,
            result.message,
            result.data
        );
    } catch (error) {
        next(error);
    }
};

const findAll = async (req, res, next) => {
    try {
        const data = {
            userId: req.user.data.id,
        };

        const result = await eventService.findAll(data);

        return response.sendResponse(
            req,
            res,
            result.status,
            result.statusCode,
            result.message,
            result.data
        );
    } catch (error) {
        next(error);
    }
};

const findOne = async (req, res, next) => {
    try {
        const data = {
            userId: req.user.data.id,
            uuid: req.params.uuid,
        };

        const result = await eventService.findOne(data);

        return response.sendResponse(
            req,
            res,
            result.status,
            result.statusCode,
            result.message,
            result.data
        );
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            userId: req.user.data.id,
            uuid: req.params.uuid,
        };

        const result = await eventService.update(data);

        return response.sendResponse(
            req,
            res,
            result.status,
            result.statusCode,
            result.message,
            result.data
        );
    } catch (error) {
        next(error);
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        const data = {
            userId: req.user.data.id,
            uuid: req.params.uuid,
        };

        const result = await eventService.delete(data);

        return response.sendResponse(
            req,
            res,
            result.status,
            result.statusCode,
            result.message
        );
    } catch (error) {
        next(error);
    }
};

module.exports = { create, deleteEvent, findAll, findOne, update };

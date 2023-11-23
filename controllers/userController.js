'use strict';
const response = require('../utilities/response');
const userService = require('../services/userService');

const updateProfile = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            uuid: req.user.data.uuid,
        };

        const result = await userService.updateProfile(data);

        return response.sendResponse(
            res,
            result.status,
            result.statusCode,
            result.message
        );
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            uuid: req.user.data.uuid,
        };

        const result = await userService.updatePassword(data);

        return response.sendResponse(
            res,
            result.status,
            result.statusCode,
            result.message
        );
    } catch (error) {
        next(error);
    }
};

module.exports = { updateProfile, changePassword };

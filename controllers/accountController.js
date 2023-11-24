'use strict';
const response = require('../utilities/response');
const accountService = require('../services/accountService');

const register = async (req, res, next) => {
    try {
        const result = await accountService.register(req.body);
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

const login = async (req, res, next) => {
    try {
        const result = await accountService.login(req.body);
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

const resetPassword = async (req, res, next) => {
    try {
        const result = await accountService.resetPassword(req.body);
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

const changePassword = async (req, res, next) => {
    try {
        const result = await accountService.changePassword(req.body);
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

module.exports = { register, login, resetPassword, changePassword };

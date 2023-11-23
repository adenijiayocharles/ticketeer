'use strict';
const response = require('../utilities/response');
const AccountService = require('../services/accountService');
const AccountServiceClass = new AccountService();

const register = async (req, res, next) => {
    try {
        const result = await AccountServiceClass.register(req.body);
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

const login = async (req, res, next) => {
    try {
        const result = await AccountServiceClass.login(req.body);
        return response.sendResponse(
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
        const result = await AccountServiceClass.resetPassword(req.body);
        return response.sendResponse(
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
        const result = await AccountServiceClass.changePassword(req.body);
        return response.sendResponse(
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

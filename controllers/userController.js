'use strict';
const { sequelize, User } = require('../models');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const tokenizer = require('../utilities/tokenizer');
const response = require('../utilities/response');

const email = require('../services/email');

const updateProfile = async (req, res, next) => {
    try {
        const user = await User.update(
            { first_name: req.body.first_name, last_name: req.body.last_name },
            {
                where: {
                    uuid: req.user.data.uuid,
                },
            }
        );

        if (user) {
            return response.sendSuccess(
                res,
                'Profile updated successfully',
                httpStatus.CREATED
            );
        } else {
            return response.sendError(
                res,
                'Unable to update profile',
                httpStatus.NOT_MODIFIED
            );
        }
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const password = await bcrypt.hashSync(
            req.body.password_confirmation,
            10
        );
        const user = await User.update(
            { password: password },
            {
                where: {
                    uuid: req.user.data.uuid,
                },
            }
        );

        if (user) {
            return response.sendSuccess(
                res,
                'Password updated successfully',
                httpStatus.CREATED
            );
        } else {
            return response.sendError(
                res,
                'Unable to update password',
                httpStatus.NOT_MODIFIED
            );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { updateProfile, changePassword };

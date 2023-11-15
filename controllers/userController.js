'use strict';
const { User } = require('../models');
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
                httpStatus.OK
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
        if (req.body.password_confirmation === req.body.current_password) {
            return response.sendError(
                res,
                'New password must NOT be the same as the old password',
                httpStatus.NOT_FOUND
            );
        }

        const user = await User.findOne({
            where: { uuid: req.user.data.uuid },
        });

        let passwordUpdated = false;
        if (user) {
            if (bcrypt.compareSync(req.body.current_password, user.password)) {
                const newPassword = await bcrypt.hashSync(
                    req.body.password_confirmation,
                    10
                );

                await user.update({ password: newPassword });
                passwordUpdated = true;
            }
        }

        if (passwordUpdated) {
            return response.sendSuccess(
                res,
                'Password updated successfully',
                httpStatus.OK
            );
        } else {
            return response.sendError(
                res,
                'Unable to update password',
                httpStatus.NOT_FOUND
            );
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { updateProfile, changePassword };

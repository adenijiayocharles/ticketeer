'use strict';
const { User } = require('../models');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const tokenizer = require('../utilities/tokenizer');
const response = require('../utilities/response');

const email = require('../services/email');

const register = async (req, res, next) => {
    try {
        const checkUser = await User.findOne({
            where: { email: req.body.email },
        });

        if (checkUser) {
            return response.sendError(
                res,
                'User already exists',
                httpStatus.BAD_REQUEST
            );
        }

        await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: await bcrypt.hashSync(req.body.password_confirmation, 10),
        });
        return response.sendSuccess(
            res,
            'Account created successfully',
            httpStatus.CREATED
        );
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email },
        });

        if (!user) {
            return response.sendError(
                res,
                'Unable to login user',
                httpStatus.BAD_REQUEST
            );
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
            const authToken = tokenizer.generateToken({
                id: user.id,
                uuid: user.uuid,
            });

            return response.sendSuccess(
                res,
                'Login successfully',
                httpStatus.OK,
                { authToken }
            );
        }

        return response.sendError(
            res,
            'Unable to login user',
            httpStatus.BAD_REQUEST
        );
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email },
        });

        if (user) {
            const randomUUID = uuidv4();
            await User.update(
                { password_reset: randomUUID },
                {
                    where: {
                        email: req.body.email,
                    },
                }
            );

            //send email here
            const emailPayload = {
                recipient: user.email,
                subject: 'Password reset',
                text: randomUUID,
            };
            await email.sendEmail(emailPayload);

            return response.sendSuccess(
                res,
                'Password reset email has been sent',
                httpStatus.OK,
                { reset_token: randomUUID }
            );
        }

        return response.sendError(
            res,
            "Unable to reset user's password",
            httpStatus.UNAUTHORIZED
        );
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
                password_reset: req.body.reset_code,
            },
        });

        if (user) {
            const password = await bcrypt.hashSync(
                req.body.password_confirmation,
                10
            );
            await User.update(
                {
                    password_reset: null,
                    password: password,
                },
                {
                    where: {
                        email: req.body.email,
                    },
                }
            );

            //send email here
            return response.sendSuccess(
                res,
                'Password updated successfully',
                httpStatus.OK
            );
        }

        return response.sendError(
            res,
            "Unable to reset user's password. Invalid email or reset code",
            httpStatus.UNAUTHORIZED
        );
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, resetPassword, changePassword };

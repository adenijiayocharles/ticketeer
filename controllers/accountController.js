'use strict';
const { sequelize, User } = require('../models');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');

const tokenizer = require('../utilities/tokenizer');
const response = require('../utilities/response');

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

module.exports = { register, login };

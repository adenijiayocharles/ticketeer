'use strict';
const { sequelize, User } = require('../models');
const httpStatus = require('http-status');
const response = require('../utilities/response');
const brcypt = require('bcrypt');

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
            password: brcypt.hashSync(req.body.password_confirmation, 10),
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

module.exports = { register };

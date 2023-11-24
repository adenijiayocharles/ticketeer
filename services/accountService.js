'use strict';
const { User } = require('../models');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const tokenizer = require('../utilities/tokenizer');
const email = require('../services/email');

class AccountService {
    constructor() {
        this.response = {};
        this.userModelInstance = User;
    }

    async register(data) {
        const checkUser = await this.userModelInstance.findOne({
            where: { email: data.email },
        });

        if (checkUser) {
            return {
                status: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'User already exists',
            };
        }

        let hashedPassword = await bcrypt.hashSync(data.password, 10);

        await this.userModelInstance.create({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: hashedPassword,
        });

        return {
            status: true,
            statusCode: httpStatus.CREATED,
            message: 'Account created successfully',
        };
    }

    async login(data) {
        const user = await this.userModelInstance.findOne({
            where: { email: data.email },
        });

        if (!user) {
            return {
                status: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Unable to login user',
            };
        }

        if (!bcrypt.compareSync(data.password, user.password)) {
            return {
                status: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Unable to login user',
            };
        }

        const authToken = tokenizer.generateToken({
            id: user.id,
            uuid: user.uuid,
        });

        return {
            status: true,
            statusCode: httpStatus.OK,
            message: 'Login successfully',
            data: authToken,
        };
    }

    async resetPassword(data) {
        const user = await this.userModelInstance.findOne({
            where: { email: data.email },
        });

        if (!user) {
            return {
                status: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: "Unable to reset user's password",
            };
        }

        const randomUUID = uuidv4();
        await this.userModelInstance.update(
            { password_reset: randomUUID },
            {
                where: {
                    email: data.email,
                },
            }
        );

        const emailPayload = {
            recipient: user.email,
            subject: 'Password reset email',
            text: randomUUID,
        };

        await email.sendEmail(emailPayload);

        return {
            status: true,
            statusCode: httpStatus.OK,
            message: 'Password reset email has been sent',
            data: randomUUID,
        };
    }

    async changePassword(data) {
        const user = await this.userModelInstance.findOne({
            where: {
                email: data.email,
                password_reset: data.reset_code,
            },
        });

        if (!user) {
            return {
                status: true,
                statusCode: httpStatus.UNAUTHORIZED,
                message:
                    "Unable to reset user's password. Invalid email or reset code",
            };
        }

        const password = await bcrypt.hashSync(data.password_confirmation, 10);
        await user.update({
            password_reset: null,
            password: password,
        });

        const emailPayload = {
            recipient: user.email,
            subject: 'Password reset successful',
            text: 'Your password has been reset',
        };

        await email.sendEmail(emailPayload);

        return {
            status: true,
            statusCode: httpStatus.OK,
            message: 'Password updated successfully',
        };
    }
}

module.exports = new AccountService();

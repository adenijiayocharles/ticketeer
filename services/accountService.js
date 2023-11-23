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
            this.response = {
                status: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'User already exists',
            };
        } else {
            let hashedPassword = await bcrypt.hashSync(data.password, 10);

            await User.create({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: hashedPassword,
            });

            this.response = {
                status: true,
                statusCode: httpStatus.CREATED,
                message: 'Account created successfully',
            };
        }

        return this.response;
    }

    async login(data) {
        const user = await this.userModelInstance.findOne({
            where: { email: data.email },
        });

        if (user && bcrypt.compareSync(data.password, user.password)) {
            const authToken = tokenizer.generateToken({
                id: user.id,
                uuid: user.uuid,
            });

            this.response = {
                status: true,
                statusCode: httpStatus.OK,
                message: 'Login successfully',
                data: authToken,
            };
        } else {
            this.response = {
                status: false,
                statusCode: httpStatus.BAD_REQUEST,
                message: 'Unable to login user',
            };
        }

        return this.response;
    }

    async resetPassword(data) {
        const user = await this.userModelInstance.findOne({
            where: { email: data.email },
        });

        if (user) {
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

            this.response = {
                status: true,
                statusCode: httpStatus.OK,
                message: 'Password reset email has been sent',
                data: randomUUID,
            };
        } else {
            this.response = {
                status: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: "Unable to reset user's password",
            };
        }

        return this.response;
    }

    async changePassword(data) {
        const user = await this.userModelInstance.findOne({
            where: {
                email: data.email,
                password_reset: data.reset_code,
            },
        });

        if (user) {
            const password = await bcrypt.hashSync(
                data.password_confirmation,
                10
            );
            await this.userModelInstance.update(
                {
                    password_reset: null,
                    password: password,
                },
                {
                    where: {
                        email: data.email,
                    },
                }
            );

            const emailPayload = {
                recipient: user.email,
                subject: 'Password reset successful',
                text: 'Your password has been reset',
            };

            await email.sendEmail(emailPayload);

            this.response = {
                status: true,
                statusCode: httpStatus.OK,
                message: 'Password updated successfully',
            };
        } else {
            this.response = {
                status: true,
                statusCode: httpStatus.UNAUTHORIZED,
                message:
                    "Unable to reset user's password. Invalid email or reset code",
            };
        }

        return this.response;
    }
}

module.exports = AccountService;

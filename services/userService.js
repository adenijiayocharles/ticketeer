'use strict';
const { User } = require('../models');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.response = {};
        this.userModelInstance = User;
    }

    async updateProfile(data) {
        const user = await this.userModelInstance.update(
            { first_name: data.first_name, last_name: data.last_name },
            {
                where: {
                    uuid: data.uuid,
                },
            }
        );

        if (user) {
            this.response = {
                status: true,
                statusCode: httpStatus.OK,
                message: 'Profile updated successfully.',
            };
        } else {
            this.response = {
                status: false,
                statusCode: httpStatus.OK,
                message: 'Unable to update profile. Please try again later',
            };
        }

        return this.response;
    }

    async updatePassword(data) {
        if (data.password_confirmation === data.current_password) {
            this.response = {
                status: false,
                statusCode: httpStatus.OK,
                message:
                    'New password must NOT be the same as the old password',
            };
        } else {
            const user = await this.userModelInstance.findOne({
                where: { uuid: data.uuid },
            });

            if (
                user &&
                bcrypt.compareSync(data.current_password, user.password)
            ) {
                const newPassword = await bcrypt.hashSync(
                    data.password_confirmation,
                    10
                );

                await user.update({ password: newPassword });
                this.response = {
                    status: true,
                    statusCode: httpStatus.OK,
                    message: 'Password updated successfully',
                };
            } else {
                this.response = {
                    status: false,
                    statusCode: httpStatus.OK,
                    message: 'Unable to update password',
                };
            }
        }

        return this.response;
    }
}

module.exports = new UserService();

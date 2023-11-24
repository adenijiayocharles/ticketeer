'use strict';
const { User } = require('../models');
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
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

        if (!user) {
            return {
                status: true,
                statusCode: httpStatus.OK,
                message: 'Profile updated successfully.',
            };
        }

        return {
            status: false,
            statusCode: httpStatus.OK,
            message: 'Unable to update profile. Please try again later',
        };
    }

    async updatePassword(data) {
        if (data.password_confirmation === data.current_password) {
            return {
                status: false,
                statusCode: httpStatus.OK,
                message:
                    'New password must NOT be the same as the old password',
            };
        }

        const user = await this.userModelInstance.findOne({
            where: { uuid: data.uuid },
        });

        if (!user) {
            return {
                status: false,
                statusCode: httpStatus.OK,
                message: 'Unable to update password',
            };
        }

        if (!bcrypt.compareSync(data.current_password, user.password)) {
            return {
                status: false,
                statusCode: httpStatus.OK,
                message: 'Unable to update password. Invalid password',
            };
        }

        const newPassword = await bcrypt.hashSync(
            data.password_confirmation,
            10
        );

        await user.update({ password: newPassword });

        return {
            status: true,
            statusCode: httpStatus.OK,
            message: 'Password updated successfully',
        };
    }
}

module.exports = new UserService();

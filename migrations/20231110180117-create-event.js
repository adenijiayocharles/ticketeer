'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('events', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                unique: true,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            start_date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            start_time: {
                allowNull: false,
                type: Sequelize.TIME,
            },
            end_date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            end_time: {
                allowNull: false,
                type: Sequelize.TIME,
            },
            location_type: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            location: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            status: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            created_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'users',
                    },
                    keys: 'id',
                },
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('events');
    },
};

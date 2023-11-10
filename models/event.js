'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Event.init(
        {
            uuid: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            start_date: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            start_time: {
                allowNull: false,
                type: DataTypes.TIME,
            },
            end_date: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            end_time: {
                allowNull: false,
                type: DataTypes.TIME,
            },
            location_type: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            location: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            status: {
                allowNull: false,
                defaultValue: false,
                type: DataTypes.BOOLEAN,
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: {
                        tableName: 'users',
                    },
                    keys: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'Event',
            tableName: 'events',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Event;
};

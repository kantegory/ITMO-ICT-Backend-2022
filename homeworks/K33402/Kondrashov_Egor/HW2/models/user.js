'use strict';

const {
    Model, fn
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
        }
    }
    User.init({
        uuid: {
            type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        email: DataTypes.STRING(127),
        firstName: { type: DataTypes.STRING(127), allowNull: true },
        middleName: { type: DataTypes.STRING(127), allowNull: true },
        lastName: { type: DataTypes.STRING(127), allowNull: true },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};

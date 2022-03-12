'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
        }
    }
    User.init({
        uuid: { type: DataTypes.UUID, primaryKey: true },
        email: DataTypes.STRING(127),
        firstName: { type: DataTypes.STRING(127), allowNull: true },
        middleName: { type: DataTypes.STRING(127), allowNull: true },
        lastName: { type: DataTypes.STRING(127), allowNull: true },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};

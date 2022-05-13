"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../../config/database.config"));
class Client extends sequelize_1.Model {
}
exports.Client = Client;
Client.init({
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    sequelize: database_config_1.default,
    tableName: 'client',
});

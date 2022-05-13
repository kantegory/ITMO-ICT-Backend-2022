"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../../config/database.config"));
class Hotel extends sequelize_1.Model {
}
exports.Hotel = Hotel;
Hotel.init({
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false,
    },
    Name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Adress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Assess: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: database_config_1.default,
    tableName: 'hotel',
});

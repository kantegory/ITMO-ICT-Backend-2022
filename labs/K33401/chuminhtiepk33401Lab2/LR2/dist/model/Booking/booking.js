"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../../config/database.config"));
const Hotel_1 = require("../Hotel/Hotel");
const Users_1 = require("../User/Users");
class Booking extends sequelize_1.Model {
}
exports.Booking = Booking;
Booking.init({
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false,
    },
    User_id: {
        type: sequelize_1.DataTypes.NUMBER,
        references: {
            model: 'client',
            key: 'id',
        },
        allowNull: false,
    },
    Hotel_id: {
        type: sequelize_1.DataTypes.NUMBER,
        references: {
            model: 'hotel',
            key: 'id',
        },
        allowNull: false,
    },
    Check_in: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    Check_out: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    Price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    timestamps: true,
    sequelize: database_config_1.default,
    tableName: 'booking',
});
Users_1.Client.hasMany(Booking);
Hotel_1.Hotel.hasMany(Booking);

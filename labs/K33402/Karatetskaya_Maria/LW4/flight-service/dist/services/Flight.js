"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Flight_1 = __importDefault(require("../models/Flight"));
const sequelize_1 = require("sequelize");
class FlightService {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const flight = yield Flight_1.default.findByPk(id);
            if (flight == null) {
                throw new Error;
            }
            return flight;
        });
    }
    filter(fo) {
        return __awaiter(this, void 0, void 0, function* () {
            let where = {};
            if (fo.departureTimeFrom || fo.departureTimeTo) {
                let departureTime;
                if (fo.departureTimeFrom && fo.departureTimeTo) {
                    departureTime = {
                        [sequelize_1.Op.gte]: fo.departureTimeFrom,
                        [sequelize_1.Op.lte]: fo.departureTimeTo
                    };
                }
                else if (fo.departureTimeFrom) {
                    departureTime = { [sequelize_1.Op.gte]: fo.departureTimeFrom };
                }
                else if (fo.departureTimeTo) {
                    departureTime = { [sequelize_1.Op.lte]: fo.departureTimeTo };
                }
                where.departure = departureTime;
            }
            if (fo.arrivalTimeFrom || fo.arrivalTimeTo) {
                let arrivalTime;
                if (fo.arrivalTimeFrom && fo.arrivalTimeTo) {
                    arrivalTime = {
                        [sequelize_1.Op.gte]: fo.arrivalTimeFrom,
                        [sequelize_1.Op.lte]: fo.arrivalTimeTo
                    };
                }
                else if (fo.arrivalTimeFrom) {
                    arrivalTime = { [sequelize_1.Op.gte]: fo.arrivalTimeFrom };
                }
                else if (fo.arrivalTimeTo) {
                    arrivalTime = { [sequelize_1.Op.lte]: fo.arrivalTimeTo };
                }
                where.arrival = arrivalTime;
            }
            if (fo.arrivalTimeFrom || fo.arrivalTimeTo) {
                let arrivalTime = {};
                if (fo.arrivalTimeFrom) {
                    arrivalTime.gte = fo.arrivalTimeFrom;
                }
                if (fo.arrivalTimeTo) {
                    arrivalTime.lte = fo.arrivalTimeTo;
                }
                where.arrival = arrivalTime;
            }
            if (fo.departureFrom) {
                where.departureFrom = fo.departureFrom;
            }
            if (fo.arrivalTo) {
                where.arrivalTo = fo.arrivalTo;
            }
            console.log(where);
            const flights = yield Flight_1.default.findAll({ where: where });
            return flights;
        });
    }
    create(flightData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // if (!flightData.ticketsRemaining) {
                //     flightData.ticketsRemaining = flightData.ticketsTotal
                // }
                return yield Flight_1.default.create(flightData);
            }
            catch (error) {
                throw new Error;
            }
        });
    }
}
exports.default = FlightService;

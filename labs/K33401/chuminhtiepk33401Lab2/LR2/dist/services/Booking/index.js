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
Object.defineProperty(exports, "__esModule", { value: true });
const booking_1 = require("../../model/Booking/booking");
class BookServices {
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield booking_1.Booking.create(userData);
                return (data);
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    getall(User_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const test = yield booking_1.Booking.findAll({ where: { User_id } });
                return (test);
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
}
exports.default = BookServices;

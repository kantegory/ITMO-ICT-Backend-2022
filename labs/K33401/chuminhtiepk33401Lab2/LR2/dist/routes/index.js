"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth/auth"));
const booking_1 = __importDefault(require("./bookings/booking"));
const hotel_1 = __importDefault(require("./hotels/hotel"));
const user_1 = __importDefault(require("./users/user"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
router.use('/users', user_1.default);
router.use('/book', booking_1.default);
router.use('/hotels', hotel_1.default);
exports.default = router;

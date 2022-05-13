"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const booking_1 = __importDefault(require("../../controllers/bookings/booking"));
const express_1 = require("express");
const passport_1 = __importDefault(require("../../middleware/passport"));
const router = (0, express_1.Router)();
const controller = new booking_1.default();
router.post('/create', passport_1.default.authenticate('jwt', { session: false }), controller.create);
router.get('/mybooking', passport_1.default.authenticate('jwt', { session: false }), controller.getall);
exports.default = router;

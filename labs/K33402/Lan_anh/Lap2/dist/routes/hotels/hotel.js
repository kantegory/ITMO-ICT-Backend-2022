"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hotel_1 = __importDefault(require("../../controllers/hotels/hotel"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller = new hotel_1.default();
router.post('/create', controller.create);
router.get('/hotel/:Name', controller.getbyname);
router.get('/listhotel', controller.getall);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);
exports.default = router;

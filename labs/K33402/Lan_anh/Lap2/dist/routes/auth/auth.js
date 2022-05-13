"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = __importDefault(require("../../controllers/auth/Auth"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller = new Auth_1.default();
router.post('/login', controller.login);
router.post('/register', controller.register);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("../../middleware/passport"));
const index_1 = __importDefault(require("../../controllers/users/index"));
const router = (0, express_1.Router)();
const meController = new index_1.default();
router.get('/me', passport_1.default.authenticate('jwt', { session: false }), meController.me);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Ticket_1 = __importDefault(require("../controller/Ticket"));
const router = express_1.default.Router();
const controller = new Ticket_1.default;
router.route("/tickets/:id").post(controller.buy);
router.route("/tickets").get(controller.getAll);
exports.default = router;

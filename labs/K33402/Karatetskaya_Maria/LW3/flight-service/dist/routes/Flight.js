"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Flight_1 = __importDefault(require("../controller/Flight"));
const Auth_1 = __importDefault(require("../middleware/Auth"));
const router = express_1.default.Router();
const controller = new Flight_1.default();
router.route("/flights/:id").get(Auth_1.default, controller.get);
router.route("/flights").get(Auth_1.default, controller.filter);
router.route("/flights").post(controller.create);
exports.default = router;

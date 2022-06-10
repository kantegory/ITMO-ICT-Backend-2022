"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../controllers/User"));
const express_1 = __importDefault(require("express"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const router = express_1.default.Router();
const userController = new User_1.default();
router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/user').get(authenticate_1.default.authenticate, userController.currentUser);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../../controllers/users/index"));
const router = express_1.default.Router();
const meController = new index_1.default();
router.get('/gioithieu', meController.gioithieu);
router.post('/create/user', meController.create);
router.get('/getdata/:id', meController.get);
router.get('/getdata', meController.getall);
router.put('/update/:id', meController.update);
router.delete('/delete/:id', meController.delete);
router.post('/create/booking', meController.createbooking);
router.post('/create/hotel', meController.createhotel);
exports.default = router;

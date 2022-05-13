"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../../controllers/example/index"));
const router = express_1.default.Router();
const exampleController = new index_1.default();
router.get('/gioithieu', exampleController.gioithieu);
router.post('/create', exampleController.create);
router.get('/getdata/:id', exampleController.get);
router.get('/getdata', exampleController.getall);
router.put('/update/:id', exampleController.update);
router.delete('/delete/:id', exampleController.delete);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("../../config/database.config"));
const index_1 = __importDefault(require("../../services/index"));
database_config_1.default.sync().then(() => {
    console.log('connect');
});
class ExampleController {
    constructor() {
        this.gioithieu = (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.send('Hello, world!');
        });
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            try {
                const user = yield this.userService.create(body);
                response.status(201).send(user);
            }
            catch (error) {
                console.log(error);
                response.status(404).send({ "error": error.message });
            }
        });
        this.get = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getById(Number(request.params.id));
            if (!user) {
                response.status(400).send('Not found');
            }
            else
                response.status(201).send(user);
        });
        this.getall = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findAll();
            response.status(201).send(user);
        });
        this.update = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const { body } = request;
            try {
                const user = yield this.userService.update(id, body);
                if (user)
                    response.status(201).send(user);
                else
                    response.status(400).send('Not found');
            }
            catch (error) {
                console.log(error);
                response.status(404).send({ "error": error.message });
            }
        });
        this.delete = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.delete(Number(request.params.id));
            if (!user) {
                response.status(400).send('Not found');
            }
            else
                response.status(201).send("Was delete");
        });
        this.userService = new index_1.default();
    }
}
exports.default = ExampleController;

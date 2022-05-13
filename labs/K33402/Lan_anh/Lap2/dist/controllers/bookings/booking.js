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
const index_1 = __importDefault(require("../../services/Booking/index"));
class BookController {
    constructor() {
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            try {
                const user = yield this.BookService.create(body);
                response.status(201).send(user);
            }
            catch (error) {
                console.log(error);
                response.status(404).send({ "error": error.message });
            }
        });
        this.getall = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.BookService.getall(request.user.id);
            response.status(201).send(data);
        });
        this.BookService = new index_1.default();
    }
}
exports.default = BookController;

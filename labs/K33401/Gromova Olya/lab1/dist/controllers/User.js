"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const User_1 = __importDefault(require("../services/User"));
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const _ = __importStar(require("lodash"));
class UserController {
    constructor() {
        this.userService = new User_1.default();
        this.register = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            try {
                yield this.userService.create(body);
                response.status(200).send({ "status": "OK" });
            }
            catch (error) {
                response.status(400).send({ "error": error.message });
            }
        });
        this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { body } = request;
            const username = body.username || body.email;
            try {
                const user = yield this.userService.get(username, body.password);
                const token = yield authenticate_1.default.createToken(user);
                response.status(200).send({ token: token });
            }
            catch (error) {
                response.status(400).send(error.message);
            }
        });
        this.currentUser = (request, response) => __awaiter(this, void 0, void 0, function* () {
            if (request.user === undefined) {
                response.sendStatus(401);
            }
            else {
                try {
                    const user = yield this.userService.getById(request.user.id);
                    response.status(200).send(_.omit(user, ['password']));
                }
                catch (error) {
                    response.sendStatus(500);
                }
            }
        });
    }
}
exports.default = UserController;

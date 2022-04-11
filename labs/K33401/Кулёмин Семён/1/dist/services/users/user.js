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
const models_1 = __importDefault(require("../../models"));
const user_1 = __importDefault(require("../../errors/users/user"));
class UserService {
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.default.User.create(userData);
                return user.toJSON();
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new user_1.default(errors);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.default.User.findByPk(id);
            if (user)
                return user.toJSON();
            throw new user_1.default('User with this id not found');
        });
    }
}
exports.default = UserService;

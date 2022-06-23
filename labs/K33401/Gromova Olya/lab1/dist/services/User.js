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
const User_1 = __importDefault(require("../models/User"));
const passwordHash_1 = require("../utils/passwordHash");
const sequelize_1 = require("sequelize");
class UserService {
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            userData.password = (0, passwordHash_1.passwordHash)(userData.password);
            userData.role = "user";
            const user = yield User_1.default.create(userData);
            return user.toJSON();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByPk(id);
            if (user == null) {
                throw new Error("Invalid identifier");
            }
            return user.toJSON();
        });
    }
    get(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = (0, passwordHash_1.passwordHash)(password);
            const user = yield User_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: {
                        username: username,
                        email: username,
                    },
                    password: hash
                }
            });
            if (user == null) {
                throw new Error("Invalid credentials");
            }
            return user.toJSON();
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findAll();
        });
    }
    updateUser(newUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newUserData.id === undefined) {
                throw new Error("Id must be presented");
            }
            return User_1.default.update(newUserData, {
                where: {
                    id: newUserData.id
                },
                returning: true
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByPk(id);
            if (user == null) {
                throw new Error("Invalid identifier");
            }
            return user.destroy();
        });
    }
}
exports.default = UserService;

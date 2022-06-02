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
const Users_1 = require("../model/Users");
const booking_1 = require("../model/booking");
const users_1 = __importDefault(require("../errors/users"));
class UserService {
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Users_1.TodoInstance.create(userData);
                return (user);
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new users_1.default(errors);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Users_1.TodoInstance.findByPk(id);
            return data;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Users_1.TodoInstance.findAll();
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Users_1.TodoInstance.findByPk(id);
                if (data) {
                    const result = yield data.update(userData);
                    return result;
                }
                else
                    return data;
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new users_1.default(errors);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deldata = yield Users_1.TodoInstance.destroy({
                where: { id }
            });
            return !!deldata;
        });
    }
    createbooking(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(userData);
                const user = yield booking_1.Booking.create(userData);
                return (user);
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new users_1.default(errors);
            }
        });
    }
}
exports.default = UserService;

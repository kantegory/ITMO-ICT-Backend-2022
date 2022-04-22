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
const Hotel_1 = require("../../model/Hotel/Hotel");
const users_1 = __importDefault(require("../../errors/users"));
class HotelService {
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield Hotel_1.Hotel.create(userData);
                return (user);
            }
            catch (e) {
                const errors = e.errors.map((error) => error.message);
                throw new users_1.default(errors);
            }
        });
    }
    getbyname(Name) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Hotel_1.Hotel.findOne({ where: { Name } });
            return data;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Hotel_1.Hotel.findAll();
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Hotel_1.Hotel.findByPk(id);
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
            const deldata = yield Hotel_1.Hotel.destroy({
                where: { id }
            });
            return !!deldata;
        });
    }
}
exports.default = HotelService;

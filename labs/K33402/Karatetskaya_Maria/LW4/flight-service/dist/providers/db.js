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
const sequelize_typescript_1 = require("sequelize-typescript");
const Flight_1 = __importDefault(require("../models/Flight"));
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'flight',
    dialect: 'sqlite',
    storage: 'flight.sqlite'
});
sequelize.addModels([Flight_1.default,]);
sequelize.sync().catch(error => console.log(error));
function testDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log('Successfully connected');
        }
        catch (error) {
            console.log('Error during connection to database');
            console.log(error);
        }
    });
}
testDb();
exports.default = sequelize;

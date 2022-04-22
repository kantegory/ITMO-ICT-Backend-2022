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
exports.jwtOptions = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const index_1 = __importDefault(require("../services/User/index"));
let secretKey = process.env.JWT_SECRET;
secretKey !== null && secretKey !== void 0 ? secretKey : (secretKey = 'secret_key');
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
    jsonWebTokenOptions: {
        maxAge: "30000ms"
    }
};
exports.jwtOptions = opts;
const customJwtStrategy = new passport_jwt_1.Strategy(opts, function (jwt_payload, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userService = new index_1.default();
        const user = yield userService.getById(jwt_payload.id);
        if (user) {
            next(null, user);
        }
        else {
            next(null, false);
        }
    });
});
passport_1.default.use(customJwtStrategy);
exports.default = passport_1.default;

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
const Flight_1 = __importDefault(require("../services/Flight"));
class FlightController {
    constructor() {
        this.flightService = new Flight_1.default();
        this.get = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const flight = yield this.flightService.get(id);
                response.send(flight);
            }
            catch (error) {
                response.status(404);
            }
        });
        this.filter = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const flights = yield this.flightService.filter(body);
                response.send(flights);
            }
            catch (error) {
                response.status(400);
            }
        });
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const flight = yield this.flightService.create(request.body);
                response.send(flight);
            }
            catch (error) {
                response.status(400).send();
            }
        });
    }
}
exports.default = FlightController;

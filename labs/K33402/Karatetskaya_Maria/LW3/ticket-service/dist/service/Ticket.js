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
const Ticket_1 = __importDefault(require("../models/Ticket"));
const axios_1 = __importDefault(require("axios"));
class TicketService {
    getFlight(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var response = yield axios_1.default
                    .get(`http://localhost:3002/flights/${id}`, {
                    headers: {
                        "Authorization": ""
                    }
                });
                return response.data;
            }
            catch (e) {
                throw new Error("No flight with given id");
            }
        });
    }
    remainingTicketCount(flightId) {
        return __awaiter(this, void 0, void 0, function* () {
            const flight = yield this.getFlight(flightId);
            const tickets = yield Ticket_1.default.findAll({ where: {
                    flightId: flightId
                } });
            return flight.ticketsTotal - tickets.length;
        });
    }
    buyTicket(flightId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const flight = yield this.getFlight(flightId);
            if ((yield this.remainingTicketCount(flightId)) == 0) {
                throw new Error("No tickets available");
            }
            const ticketData = {
                flightId: flightId,
                userId: userId
            };
            return yield Ticket_1.default.create(ticketData);
        });
    }
    getUserTickets(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield Ticket_1.default.findAll({ where: {
                    userId: userId
                } });
            return tickets;
        });
    }
}
exports.default = TicketService;

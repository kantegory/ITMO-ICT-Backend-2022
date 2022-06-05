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
const Ticket_1 = __importDefault(require("../service/Ticket"));
class TicketController {
    constructor() {
        this.ticketService = new Ticket_1.default;
        this.buy = (request, response) => __awaiter(this, void 0, void 0, function* () {
            if (!request.user) {
                response.status(401).send({ error: "Unauthenticated" });
                return;
            }
            try {
                const userId = request.user.id;
                console.log(request.user);
                const flightId = request.params.id;
                const ticket = yield this.ticketService.buyTicket(flightId, userId);
                response.send(ticket);
            }
            catch (error) {
                response.status(400).send(error);
            }
        });
        this.getAll = (request, response) => __awaiter(this, void 0, void 0, function* () {
            response.send(this.ticketService.getUserTickets(request.user.id));
        });
    }
}
exports.default = TicketController;

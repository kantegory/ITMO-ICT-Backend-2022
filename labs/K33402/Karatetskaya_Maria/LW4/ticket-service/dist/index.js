"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
const db_1 = __importDefault(require("./providers/db"));
const Ticket_1 = __importDefault(require("./routes/Ticket"));
var app = (0, express_1.default)();
var _sequelize = db_1.default;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(Ticket_1.default);
const server = (0, http_1.createServer)(app);
const port = 3002;
server.listen(port, () => console.log(`Running on port ${port}`));

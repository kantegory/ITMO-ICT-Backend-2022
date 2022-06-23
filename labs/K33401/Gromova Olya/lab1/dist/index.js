"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const db_1 = __importDefault(require("./providers/db"));
const User_1 = __importDefault(require("./routes/User"));
var sequelize = (0, db_1.default)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', User_1.default);
var server = (0, http_1.createServer)(app);
const port = 7777;
server.listen(port, () => console.log(`Server listening on localhost:${port}`));

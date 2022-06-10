import express from "express";
import { createServer } from "http";

import sequelize from "./provider/db"
import userRouter from "./routes/User/User"
import auth from "./middleware/Auth/auth";
var _sequelize = sequelize

var app = express()
app.use(express.json())
app.use('/', userRouter)

var server = createServer(app)
const port = 11111

server.listen(port, () => console.log(`Server listening on localhost:${port}`))
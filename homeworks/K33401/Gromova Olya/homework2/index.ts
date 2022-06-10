import express from "express";
import { createServer } from "http";

import sequelizeConnect from "./providers/db"

import UserController from "./controllers/User";

const userController: UserController = new UserController()

var sequelize = sequelizeConnect()

var app = express()
app.use(express.json())
app.use('/user', userController.get)


var server = createServer(app)
const port = 7777

server.listen(port, () => console.log(`Server listening on localhost:${port}`))
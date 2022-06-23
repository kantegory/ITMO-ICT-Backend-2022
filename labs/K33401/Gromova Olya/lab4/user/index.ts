import express from "express";
import { createServer } from "http";

import sequelize from "./providers/db"
import userRouter from "./routes/User"

const sequelizeObject = sequelize

var app = express()
app.use(express.json())
app.use('/auth', userRouter)


var server = createServer(app)
const port = 7777

server.listen(port, () => console.log(`Server listening on localhost:${port}`))
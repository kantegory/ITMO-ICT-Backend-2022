import express from "express";
import { createServer } from "http";

import sequelizeConnect from "./providers/db"
import userRouter from "./routes/User"

var sequelize = sequelizeConnect()

var app = express()
app.use(express.json())
app.use('/auth', userRouter)


var server = createServer(app)
const port = 7777

server.listen(port, () => console.log(`Server listening on localhost:${port}`))
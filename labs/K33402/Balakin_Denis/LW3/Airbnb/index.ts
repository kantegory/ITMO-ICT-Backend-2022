import express from "express";
import { createServer } from "http";

import sequelize from "./provider/db"
import propertyRouter from "./routes/Airbnb/Property";
import bookingRouter from "./routes/Airbnb/Booking";
import auth from "./middleware/Auth/auth";
var _sequelize = sequelize

var app = express()
app.use(express.json())
app.use('/', auth.auth, propertyRouter)
app.use('/', auth.auth, bookingRouter)


var server = createServer(app)
const port = 22222

server.listen(port, () => console.log(`Server listening on localhost:${port}`))
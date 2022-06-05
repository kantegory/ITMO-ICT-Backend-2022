import express from 'express';
import router from "./routes/User";
import { createServer } from 'http';
import sequelize from './providers/db';

var app = express();
app.use('/', router)
const _sequelize = sequelize 
const server = createServer(app)

const port = 3000;
server.listen(port, () => console.log(`Running on port ${port}`))
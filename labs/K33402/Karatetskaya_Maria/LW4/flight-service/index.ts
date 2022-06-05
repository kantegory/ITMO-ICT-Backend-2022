import express from 'express';

import cookieParser from 'cookie-parser';
import { createServer } from 'http';

import sequelize from './providers/db';
import router from './routes/Flight';
import auth from './middleware/Auth';

var app = express();
var _sequelize = sequelize;

app.use(express.json())
app.use(cookieParser())
// app.use(auth)
app.use(router)


const server = createServer(app)
const port = 3001
server.listen(port, () => console.log(`Running on port ${port}`))
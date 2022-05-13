import express from 'express';
import router from "./routes/User";
import flightsRouter from "./routes/Flight";
import ticketRouter from "./routes/Ticket";
import authRouter from "./routes/Auth";
import { createServer } from 'http';
import sequelize from './providers/db';
import cookieParser from 'cookie-parser';
import AuthService from './services/Auth';

var app = express();


app.use(express.json())
app.use(cookieParser())
app.use(async (req, res, next) => {
    try {
        const accessToken = req.cookies['AccessToken']
        if (accessToken) {
            console.log(accessToken)
            const authService = new AuthService
            req.user = await authService.authenticate(accessToken) || undefined;
            console.log(req.user)
        }
    }
    catch (error: any) {
        console.log(error)
    }
    next();
})

app.use('/', router)
app.use('/', flightsRouter)
app.use('/', ticketRouter)
app.use('/', authRouter)

const _sequelize = sequelize 
const server = createServer(app)

const port = 3000;
server.listen(port, () => console.log(`Running on port ${port}`))
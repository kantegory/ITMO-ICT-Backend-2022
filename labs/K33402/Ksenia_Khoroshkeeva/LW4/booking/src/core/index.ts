import express from "express";
import cors from "cors";
import { createServer, Server } from "http"
import routes from "../routes";
import sequelize from "../providers/db";
import { Sequelize } from "sequelize-typescript";
import bodyParser from "body-parser";
import getConfig from "../utils/getConfig";

const config: any = getConfig("SERVER");

class App {
    public port: number;
    public host: string;
    private app: express.Application;
    private server: Server;
    private sequelize: Sequelize;

    constructor(port = 8000, host = "localhost") {
        this.port = config.port || port;
        this.host = config.host || host;

        this.app = this.createApp();
        this.server = this.createServer();
        this.sequelize = sequelize;
    }

    private createApp(): express.Application {
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.use('/api', routes);
        return app;
    }

    private createServer(): Server {
        return createServer(this.app);
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Сервер запущен на ${this.host}:${this.port}`);
        })
    }
}

export default App;


import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

import { createServer, Server } from "http"
import routes from "../routes"

class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server

    constructor(port = 8000, host = "localhost") {
        this.port = port
        this.host = host

        this.app = App.createApp()
        this.server = this.createServer()
    }

    private static createApp(): express.Application {
        const app = express()
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());
        app.use('/', routes)

        return app
    }

    private createServer(): Server {
        const server = createServer(this.app)

        return server
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App
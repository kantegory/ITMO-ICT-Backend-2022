import express from 'express'
import cors from 'cors'
import { createServer, Server } from 'http'
import routes from '../routes/v1/index'
import sequelize from '../providers/db'
import { Sequelize } from 'sequelize-typescript'
import bodyParser from 'body-parser'
import passport from '../middlewares/passport'
import { config } from '../configs/config'
import swaggerUi from 'swagger-ui-express'

class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server
    private sequelize: Sequelize

    constructor(port = 8000, host = 'localhost') {
        this.port = parseInt(<string>config.server.port) || port
        this.host = config.server.host || host

        this.app = this.createApp()
        this.server = this.createServer()
        this.sequelize = sequelize
    }

    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(bodyParser.json())
        app.use(passport.initialize())
        app.use('/v1', routes)

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const swaggerDoc = require('../../run/swagger.json')
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

        return app
    }

    private createServer(): Server {
        return createServer(this.app)
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App

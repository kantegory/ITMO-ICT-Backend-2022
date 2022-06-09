import express from "express"
import { createServer, Server } from "http"
import routes from "../routes/index"
import bodyParser from "body-parser"

class App {
    public port: number
    public host: string
  
    private app: express.Application
    private server: Server

    constructor(port = 8100, host = "localhost") {
        this.port = port
        this.host = host
    
        this.app = this.createApp()
        this.server = this.createServer()  
    }
    
    private createApp(): express.Application {
        const app = express()
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
        app.use('/v1', routes)
    
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
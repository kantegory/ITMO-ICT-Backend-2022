import express from "express"
import { createServer, Server } from "http"
import routes from "../routes/index"

export default class App {
  public port: number
  public host: string

  private app: express.Application
  private server: Server

  constructor(port = 8180, host = "localhost") {
      this.port = port
      this.host = host
  
      this.app = this.createApp()
      this.server = this.createServer()
  }
  
  private createApp(): express.Application {
      const app = express()
      const bodyParser = require('body-parser')
      app.use(bodyParser.urlencoded({ extended: false }))
      app.use(bodyParser.json())
      app.use('/v1', routes)
      return app
    }
  
  private createServer(): Server {
      return createServer(this.app)
  }

  public start(): void {
      this.server.listen(this.port, () => {
          console.log(`Running auth microservice on port ${this.port}`)
      })
  }
}
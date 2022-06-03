import express from "express"
import { createServer, Server } from "http"
import routes from "../routes/v1/index"

class App {
  public port: number
  public host: string

  private app: express.Application
  private server: Server

  constructor(port = 8001, host = "localhost") {
      this.port = port
      this.host = host

      this.app = this.createApp()
      this.server = this.createServer()
  }

  private createApp(): express.Application {
      const app = express()
      const bodyParser = require('body-parser')

      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())
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
          const all_routes = require('express-list-endpoints')
          console.log(all_routes(this.app))
      })
  }
}


export default App
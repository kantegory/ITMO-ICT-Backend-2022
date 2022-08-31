import express from "express"
import { createServer, Server } from "http"
import routes from "../routes/example/index"
import sequelize from "../providers/db"
import { Sequelize } from 'sequelize-typescript'

class App {
  public port: number
  public host: string

  private app: express.Application
  private server: Server
  private sequelize: Sequelize

  constructor(port = 8000, host = "localhost") {
      this.port = port
      this.host = host
  
      this.app = this.createApp()
      this.server = this.createServer()
      this.sequelize = sequelize
  }
  
  private createApp(): express.Application {
      const app = express()
      app.use('/example', routes)
  
      return app
    }
  
  private createServer(): Server {
      const server = createServer(this.app)
  
      return server
  }

  public start(): void {
      this.sequelize
        .sync()
        .then(() => {
          console.log('Models synchronized successfully')
        })
        .catch((error) => console.log(error));  

      this.server.listen(this.port, () => {
          console.log(`Running server on port ${this.port}`)
      })
  }
}

export default App
import express from  'express'
import {createServer, Server } from "http"
import routes from "../routes/example/index"
import userRoutes from "../routes/userRoutes"
import filmRoutes from "../routes/filmRoutes"
import cookieParser from 'cookie-parser';  
import bodyParser from "body-parser";

class App {
  public port: number
  public host: string

  private app: express.Application
  private server: Server

  constructor(port = 8333, host = "localhost") {
      this.port = port
      this.host = host
  
      this.app = this.createApp()
      this.server = this.createServer()
  }
  
  private createApp(): express.Application {
      const app = express()
      app.use(express.json());
      app.use(( err : any, req : any, res : any, next : any ) => {
        res.locals.error = err;
        if (err.status >= 100 && err.status < 600)
          res.status(err.status);
        else
          res.status(500);
        res.render('error');
      });
      app.use(cookieParser());
      app.use(bodyParser.json())
      app.use('/v1', routes)
      app.use('/v1', userRoutes)
      app.use('/v1', filmRoutes)

      const swaggerUi = require('swagger-ui-express')
      const swaggerDoc = require('../swagger.json')
      app.use('/docs', swaggerUi.serve)
      app.use('/docs', swaggerUi.setup(swaggerDoc))
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
import dotenv from "dotenv"
dotenv.config()
import Express from "express"
import BodyParser from "body-parser"
import { createServer } from "http"
import sequelize from "./db"
import routes from "./routes"

const { DB_NAME, PORT } = process.env

sequelize
  .authenticate()
  .then(() => console.log(`Connected to database ${ DB_NAME }.`))

sequelize
  .sync()
  .then(() => console.log(`Models have been synced to database ${ DB_NAME }.`))

const app = Express()
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())
app.use(routes)

const server = createServer(app)

server.listen(PORT)
console.log(`Listening on port ${ PORT }.`)

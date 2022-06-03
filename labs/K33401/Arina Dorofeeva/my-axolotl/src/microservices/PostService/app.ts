import dotenv from "dotenv"
dotenv.config()
import Express from "express"
import BodyParser from "body-parser"
import { createServer } from "http"
import sequelize from "../../db"
import { cookieParser, cookieAuther } from "../../util/backend"
import PostController from "./PostController"

const { DB_NAME, POST_PORT } = process.env

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected to database ${ DB_NAME }.`)
    sequelize.associate?.()
    sequelize
      .sync()
      .then(() => console.log(`Models have been synced to database ${ DB_NAME }.`))
  })

const app = Express()

app.use(cookieParser)
app.use(cookieAuther)
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

const controller = new PostController()

app.get("/:id", controller.get)
app.get("/", controller.get)
app.post("/", controller.post)
app.post("/favorites", controller.addFavorite)

const server = createServer(app)

server.listen(POST_PORT)
console.log(`Listening on port ${ POST_PORT }.`)

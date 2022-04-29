import dotenv from "dotenv"
dotenv.config()
import Express from "express"
import BodyParser from "body-parser"
import { createServer } from "http"
import Webpack from "webpack"
import WebpackDevMiddleware from "webpack-dev-middleware"
import HistoryApiFallback from "connect-history-api-fallback"
import webpackConfig from "./webpack.config"
import sequelize from "./db"
import routes from "./routes"
import { cookieParser, cookieAuther } from "./util/backend"

const { DB_NAME, PORT } = process.env

sequelize
  .authenticate()
  .then(() => console.log(`Connected to database ${ DB_NAME }.`))
sequelize.associate()
sequelize
  .sync()
  .then(() => console.log(`Models have been synced to database ${ DB_NAME }.`))

const app = Express()

app.use(cookieParser)
app.use(cookieAuther)
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

app.use(routes)

app.use("/public", Express.static(__dirname + "/public"))

app.use(HistoryApiFallback({
  index: "/index.html"
}))
app.use(WebpackDevMiddleware(
  Webpack(webpackConfig),
  {
    publicPath: webpackConfig.output?.publicPath,
    writeToDisk: true
  }
))

const server = createServer(app)

server.listen(PORT)
console.log(`Listening on port ${ PORT }.`)

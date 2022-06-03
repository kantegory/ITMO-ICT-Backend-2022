import express from 'express'
import bodyParser from 'body-parser'

import sequelize from "./orm/db"
import router from "./routes/index"

sequelize
  .authenticate()
  .then(() => console.log(`Connected to database`))

sequelize
  .sync()
  .then(() => console.log(`Models have been synced to database.`))

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
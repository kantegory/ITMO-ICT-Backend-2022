import express from 'express'
import bodyParser from 'body-parser'

import router from "./routes/index"
import { db } from "./orm/db";

async function boostrap() {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(router)
  await db.getConnection();

  app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })
}

boostrap();

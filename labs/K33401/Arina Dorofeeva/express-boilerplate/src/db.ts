import { Sequelize } from "@sequelize/core"
import type { Dialect } from "@sequelize/core"

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  storage: process.env.DB_STORAGE,
  logging: console.log,
})

export default sequelize

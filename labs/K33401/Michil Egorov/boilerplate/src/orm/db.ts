import { Sequelize } from "@sequelize/core"
import type { Dialect } from "@sequelize/core"

const sequelize = new Sequelize({
  database: "db",
  dialect: "sqlite" as Dialect,
  username: "node",
  password: "",
  storage: "db.sqlite",
  logging: console.log,
})

export default sequelize
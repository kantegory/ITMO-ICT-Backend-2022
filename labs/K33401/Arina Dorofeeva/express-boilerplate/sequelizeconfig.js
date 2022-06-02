require("dotenv").config()

const settings = {
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  storage: process.env.DB_STORAGE,
  logging: console.log,
}

const development = settings, test = settings, production = settings

module.exports = {
  development,
  test,
  production
}

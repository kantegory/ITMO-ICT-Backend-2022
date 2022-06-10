import { Sequelize } from "sequelize-typescript";

import User from "../models/User"

const sequelize = new Sequelize({
    database: 'app',
    dialect: 'sqlite',
    storage: 'app.sqlite'
})

const models = [User, ]
sequelize.addModels(models)

sequelize.sync()
sequelize.authenticate()

export default sequelize
import { Sequelize } from "sequelize-typescript";

import Flight from "../models/Flight";
import Ticket from "../models/Ticket";

const sequelize = new Sequelize({
    database: 'app',
    dialect: 'sqlite',
    storage: 'app.sqlite'
})

const models = [Flight, Ticket, ]
sequelize.addModels(models)

sequelize.sync()
sequelize.authenticate()

export default sequelize
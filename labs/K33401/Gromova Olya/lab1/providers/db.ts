import { Sequelize } from "sequelize-typescript";

import User from "../models/User"

const dbConnect = async () => {
    const sequelize = new Sequelize({
        database: 'app',
        dialect: 'sqlite',
        storage: 'app.sqlite'
    })
    
    const models = [User, ]
    sequelize.addModels(models)
    
    await sequelize.sync()
    await sequelize.authenticate()

    return sequelize
}

export default dbConnect
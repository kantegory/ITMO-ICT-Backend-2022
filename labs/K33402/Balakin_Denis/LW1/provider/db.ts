import { Sequelize } from "sequelize-typescript";

import User from "../models/User/User"

const sequelize = new Sequelize({
    database: 'lw1',
    define: {
        timestamps: false
    },
    dialect: 'sqlite',
    username: 'root',
    password: '',
    logging: console.log,
    storage: 'lw1.sqlite',
})

const models = [User, ]
sequelize.addModels(models)

sequelize.sync()
    .then(() => console.log('Database connect (step 1) - done'))
    .catch((err) => console.error(`Database connect (step 1) - error ${err}`))

const test = async (): Promise<void> => {
    try {
        await sequelize.authenticate()
        console.log('Database connect (step 2) - done')
    }
    catch (err) {
        console.error(`Database connect (step 2) - error ${err}`)
    }
}

test()

export default sequelize
import { Sequelize } from "sequelize-typescript";
import Booking from "../models/Airbnb/Booking";
import Property from "../models/Airbnb/Property";

import User from "../models/User/User"

const sequelize = new Sequelize({
    database: 'lw2',
    define: {
        timestamps: false
    },
    dialect: 'sqlite',
    username: 'root',
    password: '',
    logging: console.log,
    storage: 'lw2.sqlite',
})

const models = [User, Property, Booking]
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
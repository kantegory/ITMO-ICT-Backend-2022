import { Sequelize } from "sequelize-typescript";

import Flight from "../models/Flight";

const sequelize = new Sequelize({
    database: 'flight',
    dialect: 'sqlite',
    storage: 'flight.sqlite'
})
sequelize.addModels([Flight,])

sequelize.sync().catch(error => console.log(error))


async function testDb() {
    try {
        await sequelize.authenticate()
        console.log('Successfully connected')
    }
    catch (error) {
        console.log('Error during connection to database')
        console.log(error)
    }
}

testDb()

export default sequelize
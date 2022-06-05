import { Sequelize } from "sequelize-typescript";

import Ticket from "../models/Ticket";

const sequelize = new Sequelize({
    database: 'flight',
    dialect: 'sqlite',
    storage: 'flight.sqlite'
})
sequelize.addModels([Ticket,])

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
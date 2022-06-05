import { Sequelize } from "sequelize-typescript";
import Flight from "../models/Flight";
import User from "../models/User";
import Ticket from "../models/Ticket";
import RefreshToken from "../models/RefreshToken";

const sequelize = new Sequelize({
    database: 'db',
    dialect: 'sqlite',
    storage: 'src/db.sqlite'
});

sequelize.addModels([User, Flight, Ticket, RefreshToken]);

sequelize.sync().catch(error => {
    console.log(error);
});

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
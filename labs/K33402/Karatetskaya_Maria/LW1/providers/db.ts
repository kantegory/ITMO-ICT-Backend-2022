import { Sequelize } from "sequelize-typescript";
import User from "../models/User";

const sequelize = new Sequelize({
    database: 'db',
    dialect: 'sqlite',
    storage: 'src/db.sqlite'
});

sequelize.addModels([User]);

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
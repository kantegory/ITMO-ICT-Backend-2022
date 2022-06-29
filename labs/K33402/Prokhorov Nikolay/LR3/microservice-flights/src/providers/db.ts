import { Sequelize } from "sequelize-typescript";
import FlightModel from "../models/flights/FlightModel";
import SeatModel from "../models/seats/SeatModel";

const sequelize = new Sequelize({
    database: 'litedb',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite',
    logging: console.log,
})

const models = [FlightModel, SeatModel]

sequelize.addModels(models)

sequelize
    .sync()
    .then(() => {
        //something here
        console.log('synced models')
    })
    .catch((e) => console.log(e))

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

testConnection().then(() => console.log('Connection success'))

export default sequelize

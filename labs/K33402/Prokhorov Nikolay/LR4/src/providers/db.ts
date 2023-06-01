import { Sequelize } from 'sequelize-typescript'
import RefreshToken from '../models/auth/RefreshToken'
import UserModel from '../models/users/UserModel'
import FlightModel from '../models/flights/FlightModel'
import SeatModel from '../models/seats/SeatModel'
import TicketModel from '../models/tickets/TicketModel'


const sequelize = new Sequelize({
    username:  process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres',
    host: 'itmo-backend-db',
    port: 5432,
    dialect: 'postgres',
    logging: console.log,
})

const models = [UserModel, RefreshToken, FlightModel, SeatModel, TicketModel]

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

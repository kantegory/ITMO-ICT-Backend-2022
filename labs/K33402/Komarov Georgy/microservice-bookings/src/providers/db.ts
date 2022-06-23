import {Sequelize, SequelizeOptions} from 'sequelize-typescript'
import RefreshToken from '../models/auth/RefreshToken'
import {config} from '../configs/config'
import User from '../models/users/User'
import Booking from '../models/bookings/Booking'

const sequelizeConfig = config.db as SequelizeOptions

const sequelize = new Sequelize(sequelizeConfig)

const models = [User, RefreshToken, Booking]

sequelize.addModels(models)

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

testConnection()

export default sequelize

import {Sequelize, SequelizeOptions} from 'sequelize-typescript'
import {config} from '../configs/config'
import Hotel from '../models/hotels/Hotel'
import Room from '../models/hotels/Room'

const sequelizeConfig = config.db as SequelizeOptions

const sequelize = new Sequelize(sequelizeConfig)

const models = [Hotel, Room]

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

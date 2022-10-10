import { Sequelize } from 'sequelize-typescript'
import RefreshToken from '../models/auth/RefreshToken'
import UserModel from '../models/users/UserModel'
import TicketModel from '../models/tickets/TicketModel'

const sequelize = new Sequelize({
    database: 'litedb',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite',
    logging: console.log,
})

const models = [UserModel, RefreshToken, TicketModel]

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

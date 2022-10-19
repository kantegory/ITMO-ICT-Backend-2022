import { Sequelize } from 'sequelize-typescript'
import User from '../models/User'

const sequelize = new Sequelize({
  database: 'project_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: 'db.sqlite',
  models: [User]
})

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection()

export default sequelize
import { Sequelize } from 'sequelize-typescript'
import User from '../models/users/User'

const sequelize = new Sequelize({
  database: 'some_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  models: [User],
  logging: console.log,
})

export default sequelize
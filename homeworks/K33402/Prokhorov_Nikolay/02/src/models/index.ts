import { Sequelize } from 'sequelize'
import configs from '../config/config'

const env = process.env.NODE_ENV || 'development'
const config = configs[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

export { Sequelize, sequelize }

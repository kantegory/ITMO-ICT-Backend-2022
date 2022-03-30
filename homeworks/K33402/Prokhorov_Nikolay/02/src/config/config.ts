import { Options } from 'sequelize/types/sequelize'

const configs: {
  [key: string]: Options & Required<Pick<Options, 'database' | 'username'>>
} = {
  development: {
    username: 'root',
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: 'db.sqlite'
  },
  test: {
    username: 'root',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
}

export default configs

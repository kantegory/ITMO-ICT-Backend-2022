// eslint-disable-next-line
const fs = require('fs')
// eslint-disable-next-line
const ini = require('ini')

const configFile = fs.readFileSync('src/configs/settings.ini', 'utf-8')
const config = ini.parse(configFile)['DATABASE']

// eslint-disable-next-line
module.exports = {
    development: {
        username: process.env.POSTGRES_PASSWORD,
        password: process.env.POSTGRES_PASSWORD,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect,
    },
    test: {
        username: process.env.POSTGRES_PASSWORD,
        password: process.env.POSTGRES_PASSWORD,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect,
    },
    production: {
        username: process.env.POSTGRES_PASSWORD,
        password: process.env.POSTGRES_PASSWORD,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect,
    },
}

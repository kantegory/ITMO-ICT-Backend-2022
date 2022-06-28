const fs = require('fs');
const ini = require('ini');
const path = require('path');

const configFile = fs.readFileSync(path.resolve(__dirname, 'settings.ini'), 'utf-8');
const config = ini.parse(configFile)['DATABASE'];

module.exports = {
    development: {
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        storage: config.storage
    },
    test: {
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        storage: config.storage
    },
    production: {
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        storage: config.storage
    }
}

const db = require('./config').config.db

module.exports = {
    development: db,
    test: db,
    production: db,
}

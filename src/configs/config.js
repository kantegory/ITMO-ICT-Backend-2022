require('dotenv').config({ path: __dirname + '/../../.env' })

const config = {
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        storage: process.env.DB_STORAGE,
    },
    auth: {
        secret: process.env.AUTH_SECRET,
        accessTokenLifetime: process.env.AUTH_ACCESS_TOKEN_LIFETIME,
        refreshTokenLifetime: process.env.AUTH_REFRESH_TOKEN_LIFETIME,
    },
    server: {
        host: process.env.SERVER_HOST,
        port: process.env.SERVER_PORT,
    },
}

module.exports = { config }

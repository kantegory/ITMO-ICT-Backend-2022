import dotEnv from "dotenv";

if (process.env.NODE_ENV !== 'prod') {
    const configFile =  `./.env`;
    dotEnv.config({ path:  configFile });
} else {
    dotEnv.config();
}
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET
}


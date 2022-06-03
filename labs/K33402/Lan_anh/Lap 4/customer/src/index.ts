import express from 'express';
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const { CreateChannel } = require('../src/utils');
const StartServer = async() => {

    const app = express();
    
    await databaseConnection();
    const channel = await CreateChannel()

    
    await expressApp(app, channel);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err: any) => {
        console.log(err);
        process.exit();
    })
}

StartServer();
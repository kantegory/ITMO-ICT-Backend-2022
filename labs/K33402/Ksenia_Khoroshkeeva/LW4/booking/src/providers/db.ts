import { Sequelize } from "sequelize-typescript";
import Booking from "../models/bookings/Booking";
import getConfig from "../utils/getConfig";

const sequelize = new Sequelize({
    ...getConfig('DATABASE'),
    logging: console.log,
})

const models = [Booking];

sequelize.addModels(models);

sequelize
    .sync()
    .then(() => {
        console.log('Модели синхронизированы');
    })
    .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('База данных подключена');
    } catch (error) {
        console.error(`Не удалось подключить базу данных: ${error}`);
    }
}

testConnection();

export default sequelize;

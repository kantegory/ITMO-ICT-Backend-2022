import { Sequelize } from "sequelize-typescript";
import RefreshToken from "../models/auth/RefreshToken";
import User from "../models/users/User";
import Hotel from "../models/hotels/Hotel";
import Room from "../models/hotels/Room";
import Booking from "../models/bookings/Booking";

const sequelize = new Sequelize({
    database: 'some_db',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'db.sqlite',
    logging: console.log,
})

const models = [User, RefreshToken, Hotel, Room, Booking];

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

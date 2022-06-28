import { Sequelize } from "sequelize-typescript";
import RefreshToken from "../models/auth/RefreshToken";
import User from "../models/users/User";
import Hotel from "../models/hotels/Hotel";
import Room from "../models/hotels/Room";
import getConfig from "../utils/getConfig";

const sequelize = new Sequelize({
    ...getConfig('DATABASE'),
    logging: console.log,
})

const models = [User, RefreshToken, Hotel, Room];

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

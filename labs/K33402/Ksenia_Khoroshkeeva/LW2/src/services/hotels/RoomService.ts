import Room from "../../models/hotels/Room";
import Hotel from "../../models/hotels/Hotel";
import {Op} from "sequelize";

class RoomService {
    async getAll(): Promise<Room[]> {
        // Получение всех комнат
        return await Room.scope('full').findAll();
    }

    async getById(id: number): Promise<Room> {
        // Получение комнаты по ID
        const room = await Room.scope('full').findByPk(id);
        if (room) {
            return room.toJSON();
        }
        throw new Error('Комната не найдена');
    }

    async searchByCity(city: string): Promise<Room[]> {
        // Получение списка комнат по названию города
        return await Room.scope('full').findAll({
            include: {
                model: Hotel,
                where: {
                    city: {[Op.substring]: city}
                }
            }
        });
    }

    async searchByCapacity(capacity: number): Promise<Room[]> {
        // Получение списка комнат по вместимости
        return await Room.scope('full').findAll({
            where: {
                capacity: {[Op.gte]: capacity}
            }
        });
    }

    async searchByCityAndCapacity(city: string, capacity: number): Promise<Room[]> {
        // Получение списка комнат по названию города и вместимости
        return await Room.scope('full').findAll({
            where: {
                capacity: {[Op.gte]: capacity}
            },
            include: {
                model: Hotel,
                where: {
                    city: {[Op.substring]: city}
                }
            }
        });
    }
}

export default RoomService;

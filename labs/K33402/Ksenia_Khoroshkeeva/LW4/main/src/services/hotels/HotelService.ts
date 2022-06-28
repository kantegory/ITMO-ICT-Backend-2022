import Hotel from "../../models/hotels/Hotel";

class HotelService {
    async getAll(): Promise<Hotel[]> {
        // Список всех отелей
        return await Hotel.scope('full').findAll();
    }

    async getById(id: number): Promise<Hotel> {
        // Получение отеля по ID
        const hotel = await Hotel.scope('full').findByPk(id);
        if (hotel) {
            return hotel.toJSON();
        }
        throw new Error('Отель не найден');
    }
}

export default HotelService;

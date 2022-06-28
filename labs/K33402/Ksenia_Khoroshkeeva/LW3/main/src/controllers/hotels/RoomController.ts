import RoomService from "../../services/hotels/RoomService";

class RoomController {
    private roomService: RoomService;

    constructor() {
        this.roomService = new RoomService();
    }

    get = async (request: any, response: any) => {
        // Получение конкретного номера
        const id: number = request.params.id;
        try {
            const room = await this.roomService.getById(id);
            response.send(room);
        } catch (error: any) {
            response.status(404).send(error.message);
        }
    }

    list = async (request: any, response: any) => {
        // Получение всех номеров с фильтрацией
        const {city, capacity} = request.query;
        console.log(city, capacity);
        if (city && capacity) {
            // Указан город и вместительность
            response.send(await this.roomService.searchByCityAndCapacity(city, capacity));
        } else if (city) {
            // Указан город
            response.send(await this.roomService.searchByCity(city));
        } else if (capacity) {
            // Указана вместительность
            response.send(await this.roomService.searchByCapacity(capacity));
        } else {
            // Ничего не указано
            response.send(await this.roomService.getAll());
        }
    }
}

export default RoomController;

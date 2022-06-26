import HotelService from "../../services/hotels/HotelService";

class HotelController {
    private hotelService: HotelService;

    constructor() {
        this.hotelService = new HotelService();
    }

    get = async (request: any, response: any) => {
        // Получение конкретного отеля
        const id: number = request.params.id;
        try {
            const hotel = await this.hotelService.getById(id);
            response.send(hotel);
        } catch (error: any) {
            response.status(404).send(error.message);
        }

    }

    list = async (request: any, response: any) => {
        // Получение всех отелей
        response.send(await this.hotelService.getAll());
    }
}

export default HotelController;

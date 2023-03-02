import BookingService from "../../services/bookings/BookingService";

class BookingController {
    private bookingService: BookingService;

    constructor() {
        this.bookingService = new BookingService();
    }

    get = async (request: any, response: any) => {
        // Получение конкретного бронирования пользователя
        const id = request.params.id;
        const user = request.user;
        try {
            const booking = await this.bookingService.getById(id);
            if (booking.userId == user.id) {
                response.send(booking);
            } else {
                response.status(404).send({"error": 'Бронирование не найдено'});
            }
        } catch (error: any) {
            response.status(404).send({'error': error.message});
        }
    }

    list = async (request: any, response: any) => {
        // Список бронирований пользователя
        const user = request.user;
        response.send(await this.bookingService.getByUserId(user.id));
    }

    create = async (request: any, response: any) => {
        // Создание бронирования
        const body = request.body;
        const user = request.user;
        try {
            const booking = await this.bookingService.create(body, user.id);
            response.send(booking);
        } catch (error: any) {
            response.status(400).send({'error': error.message});
        }
    }
}

export default BookingController;

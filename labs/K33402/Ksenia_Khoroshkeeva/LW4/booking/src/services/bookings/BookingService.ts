import Booking from "../../models/bookings/Booking";

class BookingService {
    async getById(id: number): Promise<Booking> {
        // Конкретное бронирование
        const booking = await Booking.findByPk(id);
        if (booking) {
            return booking.toJSON();
        }
        throw new Error('Бронирование не найдено');
    }

    async getByUserId(userId: number): Promise<Booking[]> {
        // Список бронирований по ID пользователя
        return await Booking.findAll({where: {userId: userId}});
    }

    async create(bookingData: any, userId: number): Promise<Booking> {
        // Создание бронирования
        try {
            const booking = await Booking.create({...bookingData, userId: userId});
            await booking.reload();
            return booking.toJSON();
        } catch (error: any) {
            const errors = error.errors.map((error: any) => error.message);
            throw new Error(errors);
        }
    }
}

export default BookingService;

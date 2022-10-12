import BookingModel from '../../models/bookings/Booking'
import BookingError from '../../errors/bookings/Booking'


class BookingService {
    async list(userId: number) {
        try {
            return await BookingModel.findAll({ where: { userId } })
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new BookingError(errors)
        }
    }

    async create(data: object) {
        try {
            const Booking = await BookingModel.create(data)
            return Booking.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new BookingError(errors)
        }
    }
}

export default BookingService

import Booking from '../models/booking'
import User from '../models/user'
import { BookingError } from '../errors/index'

class BookingService {

    async create(booking: any) {
        try {
            const newBooking = await Booking.create(booking)
            return newBooking
        } catch (e: any) {
            console.log(e.message)
            throw new BookingError('creation_error')
        }
    }

    async getAll() {
        const bookings = await Booking.findAll()
        return bookings
    }

    async getByUserId(id: number) {
        const bookings = await Booking.findAll({ include: User, where : {userId: id}})
        if (bookings[0]) return bookings

        throw new BookingError('user_not_found')
    }

    async deleteBookingById(bookingId: number) {
        const booking = await Booking.findByPk(bookingId)
        if (booking != null) {
            return await booking.destroy()
        }
    
        throw new BookingError('booking_not_found')
    }
}

export default BookingService
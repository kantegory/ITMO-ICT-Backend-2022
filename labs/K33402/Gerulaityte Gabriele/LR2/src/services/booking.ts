import BookingError from '../errors/bookings/booking'
import { Booking } from '../models/bookings/booking'
import { getRepository } from 'typeorm'

class BookingService {
    async getById(id: string) {
        const bookingRepository = getRepository(Booking)
        const booking = await bookingRepository.findOneBy({ id: parseInt(id) })

        if (booking) return booking

        throw new BookingError('Not found!')
    }

    async create(booking: any, userId: number): Promise<Booking | Error> {
        try {
            const bookingRepository = getRepository(Booking)
            return await bookingRepository.save({ ...booking, userId })
        } catch (e: any) {
            console.error(e)
            throw new BookingError(e)
        }
    }

    async listBookings(user: any) {
        console.log(user)
        const bookingRepository = getRepository(Booking)
        const bookings = await bookingRepository.find({ where: { userId: user }, relations: [`user`] })

        if (bookings) return bookings

        throw new BookingError('Not found!')
    }
}

export default BookingService

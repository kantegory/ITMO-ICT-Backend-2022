import Booking from '../../models/bookings/Booking'
import BookingError from '../../errors/bookings/Booking'
import { Optional } from 'sequelize'
import Room from '../../models/hotels/Room'
import RoomError from '../../errors/hotels/Room'
import HotelError from '../../errors/hotels/Hotel'
import User from '../../models/users/User'
import Hotel from '../../models/hotels/Hotel'

class BookingService {
    async create(data: Optional<string, any>): Promise<Booking | BookingError> {
        try {
            const roomId = data.roomId
            const room = await Room.findByPk(roomId)
            if (!room) throw new RoomError(`Room with ID ${roomId} not found!`)

            const booking = await Booking.create(data)

            return booking.toJSON()
        } catch (e: any) {
            if (e.message) {
                throw new BookingError(e.message)
            }
            const errors = e.errors.map((error: any) => error.message)

            throw new BookingError(errors)
        }
    }

    async retrieve(user: User, id: number): Promise<Booking> {
        const options = {
            where: { userId: user.id },
            include: [{ model: Room, include: [Hotel] }],
        }

        const booking = await Booking.findByPk(id, options)

        if (booking) return booking.toJSON()

        throw new HotelError('Booking not found!')
    }

    async list(user: User): Promise<Booking[]> {
        const options = {
            where: { userId: user.id },
            include: [{ model: Room, include: [Hotel] }],
        }

        return await Booking.findAll(options)
    }
}

export default BookingService

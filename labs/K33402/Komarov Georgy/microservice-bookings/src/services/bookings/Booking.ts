import Booking from '../../models/bookings/Booking'
import BookingError from '../../errors/bookings/Booking'
import {Optional} from 'sequelize'
import User from '../../models/users/User'
import {config} from '../../configs/config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch')

class BookingService {
    async create(data: Optional<string, any>): Promise<Booking | BookingError> {
        try {
            const roomId = data.roomId
            const hotelsURL = config.microservices.hotels
            const roomRetrieveURL = hotelsURL + '/v1/rooms/' + roomId

            const response = await fetch(roomRetrieveURL)
            if (response.status !== 200) throw new BookingError(`Room with ID ${roomId} not found!`)

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
            where: {userId: user.id},
        } as any

        const booking = await Booking.findByPk(id, options)

        if (booking) return booking.toJSON()

        throw new BookingError('Booking not found!')
    }

    async list(user: User): Promise<Booking[]> {
        const options = {
            where: {userId: user.id},
        }

        return await Booking.findAll(options)
    }
}

export default BookingService

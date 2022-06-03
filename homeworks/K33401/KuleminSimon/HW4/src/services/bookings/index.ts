import Booking from "../../models/booking/booking";
import MyError from "../../errors";

class BookingService {

    async create(userData: any) {
        try {
            const booking = await Booking.create(userData)

            return booking.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new MyError(errors)
        }
    }

    async getAll() {
        const bookings = await Booking.findAll()

        if (bookings) return bookings

        throw new MyError('Bookings are not found')
    }

    async getByUsername(username: string) {
        const bookings = await Booking.findAll({
            where: {
                username: username
            }
        })

        if (bookings) return bookings

        throw new MyError('Bookings for that username not found')
    }

    async getByRestaurant(restaurant_name: string) {
        const bookings = await Booking.findAll({
            where: {
                restaurant_name: restaurant_name
            }
        })

        if (bookings) return bookings

        throw new MyError('Bookings for that restaurant name not found')
    }
}

export default BookingService
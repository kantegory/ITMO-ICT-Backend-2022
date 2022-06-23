import Booking from "../../models/Airbnb/Booking";
import BookingError from "../../errors/Airbnb/BookingError";
import { Op } from "sequelize"
class BookingService {
    async create(bookingData: any) {
        const booking = await Booking.create(bookingData)
        if (booking == null)
            throw new BookingError("Invalid data")

        return booking.toJSON()
    }

    async getById(id: number) {
        const booking = await Booking.findByPk(id)
        if (booking == null) {
            throw new BookingError("Not found")
        }
        return booking.toJSON()
    }

    async getAll() {
        return await Booking.findAll()
    }

    async getByProperty(id: number) {
        return await Booking.findAll({ where: { property: id }})
    }

    async getByUser(id: number) {
        return await Booking.findAll({ where: { user: id }})
    }
    async update(bookingData: any) {
        await Booking.update(bookingData, { where: { id: bookingData.id } })
        return this.getById(bookingData.id)
    }

    async delete(id: number) {
        const booking = await Booking.findByPk(id)
        if (booking == null)
            throw new BookingError("Not found")
        booking.destroy()
    }
}

export default BookingService
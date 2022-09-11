import BookingError from '../../errors/bookings/Booking'
import BookingService from '../../services/bookings/Booking'
import BookingModel from '../../models/bookings/Booking'

class BookingController {
    private bookingService: BookingService

    constructor() {
        this.bookingService = new BookingService()
    }

    list = async (request: any, response: any) => {
        if (!request.user) return response.status(401).send({error: 'Not authorized'})

        try {
            const bookings = await this.bookingService.list(request.user.id)
            return response.send(bookings)
        } catch (error: any) {
            response.status(404).send({ 'error': error.message })
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request

        if (!request.user) return response.status(401).send({error: 'Not authorized'})

        body.userId = request.user.id

        try {
            const booking: BookingModel | BookingError = await this.bookingService.create(body)

            response.status(201).send(booking)
        } catch (error: any) {
            response.status(400).send({ 'error': error.message })
        }
    }
}


export default BookingController

import BookingService from '../../services/bookings/BookingService'

class BookingController {
    private bookingService

    constructor() {
        this.bookingService = new BookingService
    }

    list = async (request: any, response: any) => {
        const bookings = await this.bookingService.listByUser(request.user.id)
        response.send(bookings)
    }

    retrieve = async (request: any, response: any) => {
        try {
            const hotel = await this.bookingService.getById(
                Number(request.params.id)
            )
            response.send(hotel)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    create = async (request: any, response: any) => {
        request.body.userId = request.user.id
        try {
            const booking = await this.bookingService.create(request.body);
            response.status(201).send(booking)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }

    }

}

export default BookingController

import BookingService from "../../services/bookings";

class BookingController {
    private bookingService = new BookingService()

    constructor() {
        this.bookingService = new BookingService()
    }

    post = async (request: any, response: any) => {

        const { body } = request

        try {
            const booking = await this.bookingService.create(body)

            response.status(201).send(booking)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }

    }

    getAll = async (request: any, response: any) => {
        try {
            const bookings = await this.bookingService.getAll()

            response.send(bookings)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getByUsername = async (request: any, response: any) => {
        try {
            const bookings = await this.bookingService.getByUsername(
                request.params.username
            )

            response.send(bookings)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getByRestaurant = async (request: any, response: any) => {
        try {
            const bookings = await this.bookingService.getByRestaurant(
                request.params.restaurant_name
            )

            response.send(bookings)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default BookingController
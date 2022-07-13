import BookingService from '../services/booking';
import { BookingError } from '../errors/index'

class BookingController {

    private service: BookingService;

    constructor() {
        this.service = new BookingService();
    }

    createBooking = async (request: any, response: any) => {
        const { body } = request
        try {
            const bookings = await this.service.create(body)
            response.status(201).send(bookings)
        } catch (error: any) {
            response.status(400).send({ "error_msg": error.message })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const bookings = await this.service.getAll()
            response.status(200).send(bookings)
        } catch (error: any) {
            response.status(400).send({ "error_msg": error.message })
        }
    }

    getByUserId = async (request: any, response: any) => {
        try {
            const bookings = await this.service.getByUserId(request.params.id)
            response.status(200).send(bookings)
        } catch (error: any) {
            response.status(404).send({ "error_msg": error.message })
        }
    }

    deleteBookingById = async (request: any, response: any) => {
        try {
            const bookings = await this.service.deleteBookingById(request.params.id)
            response.status(200).send(bookings)
        } catch (error: any) {
            if (error instanceof BookingError) {
                response.status(204).send({ "error": error.message })
            } else {
                console.log(error.message)
                response.status(400).delete({ "error": error.message })
            }
        }
    }
}

export default BookingController
import { v4 as uuidv4 } from "uuid"
import BookingService from "../services/booking"

class BookingController {
    private bookingService: BookingService

    constructor() {
        this.bookingService = new BookingService()
    }

    get = async (request: any, response: any) => {
        try {
            const records = await this.bookingService.listBookings(request.user.id)
            return response.json(records);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    post = async (request: any, response: any) => {
        try {
            const record = await this.bookingService.create(request.body, request.user.id)
            return response.json({ record, msg: 'Successfully attend this event' })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }     
}

export default BookingController

import { UpdateResult, DeleteResult } from 'typeorm'
import Booking from '../../models/bookings/Booking'
import BookingService from '../../services/bookings/Booking'

class BookingController {
    private bookingService: BookingService

    constructor() {
        this.bookingService = new BookingService()
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request

            const res: Booking | Error = await this.bookingService.create(body)

            response.status(201).send(res)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    retrieve = async (request: any, response: any) => {
        try {
            const res: Booking | Error = await this.bookingService.get(Number(request.params.id))

            response.send(res)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const { body } = request

            const res: UpdateResult | Error = await this.bookingService.update(Number(request.params.id), body)

            response.send(res)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const res: DeleteResult | Error = await this.bookingService.delete(Number(request.params.id))

            response.send(res)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getList = async (request: any, response: any) => {
        try {
            const res: Booking[] | Error = await this.bookingService.getList()

            response.send(res)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default BookingController
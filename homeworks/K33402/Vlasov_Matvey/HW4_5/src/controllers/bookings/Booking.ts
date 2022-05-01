import { UpdateResult, DeleteResult } from 'typeorm'
import Booking from '../../models/bookings/Booking'
import BookingService from '../../services/bookings/Booking'

class BookingController {
    private bookingService: BookingService

    constructor() {
        this.bookingService = new BookingService()
    }

    private sendError(response: any, error: any) {
        let statusCode = 400
        if (error.message.includes('not found')) statusCode = 404
        response.status(statusCode).send({ "error": error.message })
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request

            const res: Booking | Error = await this.bookingService.create(body)

            response.status(201).send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    retrieve = async (request: any, response: any) => {
        try {
            const res: Booking | Error = await this.bookingService.get(Number(request.params.id))

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    update = async (request: any, response: any) => {
        try {
            const { body } = request

            const res: UpdateResult | Error = await this.bookingService.update(Number(request.params.id), body)

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const res: DeleteResult | Error = await this.bookingService.delete(Number(request.params.id))

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    getList = async (request: any, response: any) => {
        try {
            const res: Booking[] | Error = await this.bookingService.getList()

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }
}

export default BookingController
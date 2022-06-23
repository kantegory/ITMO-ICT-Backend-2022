import BookingService from '../../services/bookings/Booking'
import { Request, Response } from 'express'
import User from '../../models/users/User'

class BookingController {
    private bookingService: BookingService

    constructor() {
        this.bookingService = new BookingService()
    }

    create = async (request: Request, response: Response) => {
        /*
            #swagger.requestBody = {
                required: true,
                schema: { $ref: '#/definitions/BookingCreate' }
            }
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/Booking' },
            }
            #swagger.security = [{
               'bearerAuth': []
            }]
            #swagger.tags = ['Bookings']
            #swagger.summary = Создать бронирование
        */

        const userId = (request.user as User)?.id

        try {
            const booking = await this.bookingService.create({ ...request.body, userId })
            response.status(201).send(booking)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    retrieve = async (request: Request, response: Response) => {
        /*
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/Booking' },
            }
            #swagger.security = [{
               'bearerAuth': []
            }]
            #swagger.tags = ['Bookings']
            #swagger.summary = Получить информацию о бронировании пользователя
        */

        const id = Number(request.params.id)
        try {
            const booking = await this.bookingService.retrieve(request.user as User, id)
            response.send(booking)
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }

    list = async (request: Request, response: Response) => {
        /*
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/Bookings' },
            }
            #swagger.security = [{
               'bearerAuth': []
            }]
            #swagger.tags = ['Bookings']
            #swagger.summary = Получить список бронирований пользователя
        */

        try {
            const bookings = await this.bookingService.list(request.user as User)
            response.send(bookings)
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }
}

export default BookingController

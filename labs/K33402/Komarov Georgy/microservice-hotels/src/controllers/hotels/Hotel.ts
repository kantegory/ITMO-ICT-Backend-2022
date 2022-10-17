import HotelService from '../../services/hotels/Hotel'
import { Request, Response } from 'express'

class HotelController {
    private hotelService: HotelService

    constructor() {
        this.hotelService = new HotelService()
    }

    list = async (request: Request, response: Response) => {
        /*
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/Hotels' },
            }
            #swagger.tags = ['Hotels']
            #swagger.summary = Получить список отелей
        */

        const { query } = request
        const hotels = await this.hotelService.list(query)
        response.status(200).send(hotels)
    }

    retrieve = async (request: Request, response: Response) => {
        /*
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/HotelWithRooms' },
            }
            #swagger.tags = ['Hotels']
            #swagger.summary = Получить информацию об отеле
        */

        const id = Number(request.params.id)
        try {
            const hotel = await this.hotelService.retrieve(id)
            response.send(hotel)
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }

    create = async (request: Request, response: Response) => {
        /*
            #swagger.requestBody = {
                required: true,
                schema: { $ref: '#/definitions/HotelCreate' }
            }
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/Hotel' },
            }
            #swagger.security = [{
               'bearerAuth': []
            }]
            #swagger.tags = ['Hotels']
            #swagger.summary = Создать отель
            #swagger.description = Только для админов
        */

        try {
            const hotel = await this.hotelService.create(request.body)

            response.status(201).send(hotel)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    update = async (request: Request, response: Response) => {
        /*
            #swagger.requestBody = {
                required: true,
                schema: { $ref: '#/definitions/HotelUpdate' }
            }
            #swagger.security = [{
               'bearerAuth': []
            }]
            #swagger.tags = ['Hotels']
            #swagger.summary = Редактировать отель
            #swagger.description = Только для админов
        */

        const { body, params } = request
        const id = Number(params.id)

        try {
            await this.hotelService.update(id, body)
            response.send({ msg: 'Hotel has been updated successfully' })
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    destroy = async (request: Request, response: Response) => {
        /*
            #swagger.security = [{
               'bearerAuth': []
            }]
            #swagger.tags = ['Hotels']
            #swagger.summary = Удалить отель
            #swagger.description = Только для админов
        */

        const id = Number(request.params.id)

        try {
            await this.hotelService.destroy(id)
            response.send({ msg: 'Hotel has been deleted successfully' })
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }
}

export default HotelController

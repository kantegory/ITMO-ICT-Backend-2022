import RoomService from '../../services/hotels/Room'
import { Request, Response } from 'express'

class RoomController {
    private roomService: RoomService

    constructor() {
        this.roomService = new RoomService()
    }

    retrieve = async (request: Request, response: Response) => {
        /*
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/Room' },
            }
            #swagger.tags = ['Rooms']
            #swagger.summary = Получить информацию об комнате
        */

        const id = Number(request.params.id)
        try {
            const room = await this.roomService.retrieve(id)
            response.send(room)
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }

    create = async (request: Request, response: Response) => {
        /*
            #swagger.requestBody = {
                required: true,
                schema: { $ref: '#/definitions/RoomCreate' }
            }
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/Room' },
            }
            #swagger.security = [{
               'bearerAuth': []
            }]
            #swagger.tags = ['Rooms']
            #swagger.summary = Создать комнату
            #swagger.description = Только для админов
        */

        try {
            const room = await this.roomService.create(request.body)

            response.status(201).send(room)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    update = async (request: Request, response: Response) => {
        /*
            #swagger.requestBody = {
                required: true,
                schema: { $ref: '#/definitions/RoomUpdate' }
            }
            #swagger.security = [{
               'bearerAuth': []
            }]
            #swagger.tags = ['Rooms']
            #swagger.summary = Редактировать комнату
            #swagger.description = Только для админов
        */

        const { body, params } = request
        const id = Number(params.id)

        try {
            await this.roomService.update(id, body)
            response.send({'msg': 'Room has been updated successfully'})
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    destroy = async (request: Request, response: Response) => {
        /*
            #swagger.security = [{
               'bearerAuth': []
            }]
            #swagger.tags = ['Rooms']
            #swagger.summary = Удалить комнату
            #swagger.description = Только для админов
        */

        const id = Number(request.params.id)

        try {
            await this.roomService.destroy(id)
            response.send({'msg': 'Room has been deleted successfully'})
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }
}

export default RoomController

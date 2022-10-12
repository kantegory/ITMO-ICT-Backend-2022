import RoomModel from '../../models/rooms/Room'
import RoomError from '../../errors/rooms/Room'
import RoomService from '../../services/rooms/Room'

class RoomController {
    private roomService: RoomService

    constructor() {
        this.roomService = new RoomService()
    }

    list = async (request: any, response: any) => {
        try {
            const rooms = await this.roomService.list(request.params.id)
            return response.send(rooms)
        } catch (error: any) {
            response.status(404).send({ 'error': error.message })
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request

        try {
            const room: RoomModel | RoomError = await this.roomService.create(body)

            response.status(201).send(room)
        } catch (error: any) {
            response.status(400).send({ 'error': error.message })
        }
    }
}

export default RoomController

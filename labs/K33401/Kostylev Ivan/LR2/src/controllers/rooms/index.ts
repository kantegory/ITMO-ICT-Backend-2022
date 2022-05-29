import RoomService from '../../services/room';
import { RoomOperationError } from '../../errors/index'

class RoomController {

    private service: RoomService;

    constructor() {
        this.service = new RoomService();
    }

    createRoom = async (request: any, response: any) => {
        const { body } = request
        try {
            const room = await this.service.create(body)
            response.status(201).send(room)
        } catch (error: any) {
            response.status(400).send({ "error_msg": error.message })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const hotels = await this.service.getAll()
            response.status(200).send(hotels)
        } catch (error: any) {
            response.status(404).send({ "error_msg": error.message })
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const room = await this.service.getById(Number(request.params.id))
            response.send(room)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getByTown = async (request: any, response: any) => {
        try {
            const room = await this.service.getByTown(request.params.town)
            response.status(200).send(room)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getByCapacity = async (request: any, response: any) => {
        try {
            const room = await this.service.getByCapacity(Number(request.params.capacity))
            response.status(200).send(room)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default RoomController
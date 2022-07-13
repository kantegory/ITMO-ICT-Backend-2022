import HotelService from '../services/hotel';
import { HotelOperationError } from '../errors/index'

class HotelController {

    private service: HotelService;

    constructor() {
        this.service = new HotelService();
    }

    createHotel = async (request: any, response: any) => {
        const { body } = request
        try {
            const hotel = await this.service.create(body)
            response.status(201).send(hotel)
        } catch (error: any) {
            response.status(400).send({ "error_msg": error.message })
        }

    }

    update = async (request: any, response: any) => {
        const { newHotelInfo } = request
        try {
            const hotel = await this.service.update(newHotelInfo)
            response.status(200).send(hotel.toJSON());
        } catch (error: any) {
            response.status(404).send({ "error_msg": error.message })
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
            const hotel = await this.service.getById(Number(request.params.id))
            response.send(hotel)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getByTown = async (request: any, response: any) => {
        try {
            const hotel = await this.service.getByTown(request.params.town)
            response.status(200).send(hotel)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    deleteHotelById = async (request: any, response: any) => {
        try { 
            const hotel = await this.service.deleteHotelById(request.params.id)
            response.status(200).send(hotel)
        } catch (error: any) {
            if (error instanceof HotelOperationError) {
                response.status(204).send({ "error": error.message})
            } else {
                console.log(error.message)
                response.status(400).delete({ "error": error.message})
            }
        }
    }
}

export default HotelController
import HotelService from '../../services/hotels/Hotel'
import { Request, Response } from 'express'

class HotelController {
    private hotelService: HotelService

    constructor() {
        this.hotelService = new HotelService()
    }

    list = async (request: Request, response: Response) => {
        const { query } = request
        const hotels = await this.hotelService.list(query)
        response.status(200).send(hotels)
    }

    retrieve = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        try {
            const hotel = await this.hotelService.retrieve(id)
            response.send(hotel)
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }

    create = async (request: Request, response: Response) => {
        try {
            const hotel = await this.hotelService.create(request.body)

            response.status(201).send(hotel)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    update = async (request: Request, response: Response) => {
        const { body, params } = request
        const id = Number(params.id)

        try {
            await this.hotelService.update(id, body)
            response.send({'msg': 'Hotel has been updated successfully'})
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    destroy = async (request: Request, response: Response) => {
        const id = Number(request.params.id)

        try {
            await this.hotelService.destroy(id)
            response.send({'msg': 'Hotel has been deleted successfully'})
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }
}

export default HotelController

import HotelModel from '../../models/hotels/Hotel'
import HotelError from '../../errors/hotels/Hotel'
import HotelService from '../../services/hotels/Hotel'

class HotelController {
    private hotelService: HotelService

    constructor() {
        this.hotelService = new HotelService()
    }

    list = async (request: any, response: any) => {
        const { location } = request.query

        try {
            const hotels = await this.hotelService.list(location)

            return response.send(hotels)
        } catch (error: any) {
            response.status(404).send({ 'error': error.message })
        }
    }

    create = async (request: any, response: any) => {
        const { body } = request

        try {
            const hotel: HotelModel | HotelError = await this.hotelService.create(body)

            response.status(201).send(hotel)
        } catch (error: any) {
            response.status(400).send({ 'error': error.message })
        }
    }

    item = async (request: any, response: any) => {
        try {
            const hotel = await this.hotelService.item(request.params.id)
            return response.send(hotel)
        } catch (error: any) {
            response.status(404).send({ 'error': error.message })
        }
    }

}

export default HotelController

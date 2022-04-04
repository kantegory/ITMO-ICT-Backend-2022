import Hotel from '../../orm/models/hotels/Hotel'
import HotelService from '../../services/hotels/Hotel'

class UserController {
    private hotelService

    constructor() {
        this.hotelService = new HotelService
    }

    list = async (request: any, response: any) => {
        var hotels: Hotel[]
        if (request.query.q) {
            hotels = await this.hotelService.getFilteredList(request.query.q)
        } else {
            hotels = await this.hotelService.getList()
        }
        response.send(hotels)
    }

    retrieve = async (request: any, response: any) => {
        try {
            const hotel = await this.hotelService.getById(
                Number(request.params.id)
            )
            response.send(hotel)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

}

export default UserController

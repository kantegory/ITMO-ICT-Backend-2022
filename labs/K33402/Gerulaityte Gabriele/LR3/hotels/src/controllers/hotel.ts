import { v4 as uuidv4 } from "uuid"
import HotelService from "../services/hotel"
import router from "../routes/index"
import { Hotel } from "../models/hotel/hotel"

class HotelController {
    private hotelService: HotelService

    constructor() {
        this.hotelService = new HotelService()
    }

    get = async (request: any, response: any) => {
        try {
            if (request.query.q) {
                response.json(await this.hotelService.getFilteredList(request.query.q))
            } else {
                response.json(await this.hotelService.listHotels())
            }
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    
    post = async (request: any, response: any) => {
        try {
            const record = await this.hotelService.create(request.body)
            return response.json({ record, msg: 'Successfully create hotel' })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
}

export default HotelController

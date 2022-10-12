import HotelModel from '../../models/hotels/Hotel'
import HotelError from '../../errors/hotels/Hotel'


class HotelService {
    async list(location?: string) {
        if (location) {
            return await HotelModel.findAll({ where: { location } })
        } else {
            return await HotelModel.findAll()
        }
    }

    async create(data: object) {
        try {
            const hotel = await HotelModel.create(data)
            return hotel.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new HotelError(errors)
        }
    }

    async item(hotelId: number) {
        try {
            return await HotelModel.findByPk(hotelId)
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new HotelError(errors)
        }
    }
}

export default HotelService

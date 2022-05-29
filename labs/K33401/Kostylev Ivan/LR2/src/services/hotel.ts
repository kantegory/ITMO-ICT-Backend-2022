import Hotel from '../models/hotel/hotel'
import Room from '../models/room/room'
import { HotelOperationError } from '../errors/index'

class HotelService {

    async create(hotel: any) {
        try {
            const newHotel = await Hotel.create(hotel)
            return newHotel
        } catch (e: any) {
            console.log(e.message)
            throw new HotelOperationError('creation_error')
        }
    }

    async getAll() {
        try {
            const hotel = await Hotel.findAll({})
            if (hotel) return hotel

            throw new HotelOperationError('no_hotels')
        } catch (e: any) {
            console.log(e.message)
            throw new HotelOperationError('db_error')
        }
    }

    async getById(id: number) {
        try {
            const hotels = await Hotel.findByPk(id)
            return hotels
        } catch (error: any) {
            console.log(error.message)
            throw new HotelOperationError('hotel_not_found')
        }
    }

    async getByTown(town: string) {
        try {
            const hotels = await Hotel.findAll({ where: { town: town } })
            return hotels
        } catch (error: any) {
            console.log(error.message)
            throw new HotelOperationError('hotel_not_found')
        }
    }

    async getByName(name: string) {
        try {
            const hotels = await Hotel.findAll({ where: { name: name } })
            return hotels
        } catch (error: any) {
            console.log(error.message)
            throw new HotelOperationError('hotel_not_found')
        }
    }

    async deleteHotelById(id: number) {
        const hotel = await Hotel.findByPk(id)

        if (hotel != undefined) {
            await Room.destroy({ where: { hotelId: id } })
            return await hotel.destroy()
        }

        throw new HotelOperationError('hotel_not_found')
    }
}

export default HotelService
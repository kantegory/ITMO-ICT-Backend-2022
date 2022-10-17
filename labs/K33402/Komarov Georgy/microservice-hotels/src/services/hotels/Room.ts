import { Optional } from 'sequelize'
import Room from '../../models/hotels/Room'
import RoomError from '../../errors/hotels/Room'
import Hotel from '../../models/hotels/Hotel'
import HotelError from '../../errors/hotels/Hotel'

class RoomService {
    async retrieve(id: number): Promise<Hotel> {
        const room = await Room.findByPk(id)

        if (room) return room.toJSON()

        throw new HotelError('Room not found!')
    }

    async create(data: Optional<string, any>): Promise<Room | RoomError> {
        try {
            const hotelId = data.hotelId
            const hotel = await Hotel.findByPk(hotelId)
            if (!hotel) throw new HotelError(`Hotel with ID ${hotelId} not found!`)

            const room = await Room.create(data)

            return room.toJSON()
        } catch (e: any) {
            if (e.message) {
                throw new RoomError(e.message)
            }
            const errors = e.errors.map((error: any) => error.message)

            throw new RoomError(errors)
        }
    }

    async update(id: number, data: Optional<string, any>): Promise<boolean | RoomError> {
        const result = await Room.update(data, { where: { id: id } })
        const num = result[0]

        if (num === 1) {
            return true
        } else {
            throw new RoomError('An error occurred while updating room!')
        }
    }

    async destroy(id: number): Promise<boolean | RoomError> {
        const num = await Room.destroy({ where: { id: id } })

        if (num === 1) {
            return true
        } else {
            throw new RoomError('An error occurred while deleting room!')
        }
    }
}

export default RoomService

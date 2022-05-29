import Room from '../models/room/room'
import Hotel from '../models/hotel/hotel'
import { Op } from 'sequelize'
import { RoomOperationError } from '../errors/index'

class RoomService {

    async create(room: any) {
        try {
            // if (await this.isHotelInvalid(room)) {
            //     throw new RoomOperationError('no_such_hotel')
            // }
            const newRoom = await Room.create(room)
            return newRoom
        } catch (e: any) {
            console.log(e.message)
            throw new RoomOperationError('creation_error')
        }
    }

    // private async isHotelInvalid(room: any) {
    //     return room.hotelId in (await Hotel.findAll()).map((hotel) => hotel.id)
    // }

    async getAll() {
        const rooms = await Room.findAll()
        if (rooms[0]) return rooms

        throw new RoomOperationError('no_rooms')
    }

    async getByCapacity(capacity: number) {
        const rooms = await Room.findAll({where : {capacity: capacity}})
        if (rooms[0]) return rooms

        throw new RoomOperationError('no_rooms_with_such_capacity')
    }

    async getByTown(town: string) {
        return (await Room.findAll({ include : Hotel }))
    
        throw new RoomOperationError('no_rooms_with_such_town')
    }

    async getById(id: number) {
        const rooms = await Room.findByPk(id)
        if (rooms) return rooms

        throw new RoomOperationError('no_rooms_with_such_id')
    }
}

export default RoomService
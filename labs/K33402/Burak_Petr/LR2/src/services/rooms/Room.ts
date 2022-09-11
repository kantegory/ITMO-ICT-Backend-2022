import RoomModel from '../../models/rooms/Room'
import RoomError from '../../errors/rooms/Room'


class RoomService {
    async list(hotelId: number) {
        try {
            return await RoomModel.findAll({ where: { hotelId } })
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new RoomError(errors)
        }
    }

    async create(data: object) {
        try {
            const Room = await RoomModel.create(data)
            return Room.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new RoomError(errors)
        }
    }
}

export default RoomService

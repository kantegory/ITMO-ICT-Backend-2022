import { Optional } from 'sequelize'
import Room from '../../models/hotels/Room'
import RoomError from '../../errors/hotels/Room'

class RoomService {
    async create(data: Optional<string, any>): Promise<Room | RoomError> {
        try {
            const room = await Room.create(data)

            return room.toJSON()
        } catch (e: any) {
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

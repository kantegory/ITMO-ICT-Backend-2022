import { AllowNull, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import User from '../users/User'
import RoomModel from '../rooms/Room'

@Table
class BookingModel extends Model {
    @AllowNull(false)
    @Column
    dateArrival: Date

    @Column
    dateDeparture: Date

    @AllowNull(false)
    @Column
    guestsNumber: number

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number

    @AllowNull(false)
    @ForeignKey(() => RoomModel)
    @Column
    roomId: number
}

export default BookingModel

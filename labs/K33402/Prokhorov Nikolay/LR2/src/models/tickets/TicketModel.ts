import { ForeignKey, Model, Table } from 'sequelize-typescript'
import UserModel from '../users/UserModel'
import SeatModel from '../seats/SeatModel'

@Table
export default class TicketModel extends Model {
    @ForeignKey(() => SeatModel)
    seatId: number

    @ForeignKey(() => UserModel)
    createdBy: number
}

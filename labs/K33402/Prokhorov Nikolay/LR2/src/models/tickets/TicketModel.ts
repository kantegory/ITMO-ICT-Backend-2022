import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import UserModel from '../users/UserModel'
import SeatModel from '../seats/SeatModel'

@Table
export default class TicketModel extends Model {
    @ForeignKey(() => SeatModel)
    @Column({ allowNull: false })
    seatId: number

    @BelongsTo(() => SeatModel)
    seat: SeatModel

    @ForeignKey(() => UserModel)
    @Column({ allowNull: false })
    createdBy: number

    @BelongsTo(() => UserModel)
    passenger: UserModel
}

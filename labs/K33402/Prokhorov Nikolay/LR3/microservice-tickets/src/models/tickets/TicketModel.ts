import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import UserModel from '../users/UserModel'

@Table
export default class TicketModel extends Model {
    @Column({ allowNull: false })
    seatId: number

    @ForeignKey(() => UserModel)
    @Column({ allowNull: false })
    createdBy: number

    @BelongsTo(() => UserModel)
    passenger: UserModel
}

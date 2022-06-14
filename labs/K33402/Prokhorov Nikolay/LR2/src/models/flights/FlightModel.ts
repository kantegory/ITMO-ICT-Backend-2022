import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import UserModel from '../users/UserModel'

@Table
export default class FlightModel extends Model {
    @Column({ allowNull: false })
    departureAirport: string

    @Column({ allowNull: false })
    departureTime: Date

    @Column({ allowNull: false })
    arrivalAirport: string

    @Column({ allowNull: false })
    arrivalTime: Date

    @Column({ allowNull: false })
    aircraft: string

    @Column({ allowNull: false })
    flightNumber: string

    @ForeignKey(() => UserModel)
    createdBy: number
}

import { Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import SeatModel from '../seats/SeatModel'

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

    @Column({ allowNull: false })
    createdBy: number

    @HasMany(() => SeatModel)
    seats: SeatModel[]
}

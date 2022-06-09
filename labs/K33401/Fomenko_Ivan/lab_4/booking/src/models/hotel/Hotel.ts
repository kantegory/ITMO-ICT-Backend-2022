import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, HasMany, Min, Max } from 'sequelize-typescript'
import Booking from '../booking/Booking'

@Table
class Hotel extends Model {
    @Column
    name: string

    @Column
    town: string

    @Min(10)
    @Max(1000)
    @Column
    capacity: number

    @Column
    type: string

    @HasMany(() => Booking)
    booking: Booking[]
}

export default Hotel
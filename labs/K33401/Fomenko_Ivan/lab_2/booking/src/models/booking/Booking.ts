import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, IsDate, Min, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Hotel from '../hotel/Hotel'
import User from '../user/User'

@Table
class Booking extends Model {
    @IsDate
    @Column
    arrival: Date

    @IsDate
    @Column
    departure: Date

    @Min(1)
    @Column
    visitors: number

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Hotel)
    @Column
    hotelId: number

    @BelongsTo(() => Hotel)
    hotel: Hotel
}

export default Booking
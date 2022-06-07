import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, Min, HasMany } from 'sequelize-typescript'
import Booking from '../booking/Booking'

@Table
class User extends Model {
    @Column
    name: string

    @Column
    surname: string

    @Column
    email: string

    @Column
    password: string

    @Min(0)
    @Column
    age: number

    @HasMany(() => Booking)
    booking: Booking[]
}

export default User
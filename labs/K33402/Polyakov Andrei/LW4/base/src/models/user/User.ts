import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import Booking from '../booking/Booking'

@Table
export default class User extends Model {
  @Column
  nickname: string

  @Column
  name: string

  @Column
  surname: string

  @Column
  email: string

  @Column
  password: string

  @HasMany(() => Booking)
  bookings: Booking[]
}
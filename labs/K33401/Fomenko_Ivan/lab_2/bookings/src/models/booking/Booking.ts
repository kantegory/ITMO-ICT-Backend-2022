import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'

@Table
class Booking extends Model {
    @Column
    name: string

    @Column
    surname: string

    @Column
    email: string

    @Column
    age: string
}

export default Booking
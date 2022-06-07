import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'

@Table
class Hotel extends Model {
    @Column
    name: string

    @Column
    surname: string

    @Column
    email: string

    @Column
    age: string
}

export default Hotel
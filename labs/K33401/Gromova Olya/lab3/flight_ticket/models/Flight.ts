import { Table, Model, PrimaryKey, Column, AllowNull, AutoIncrement } from "sequelize-typescript";

@Table
class Flight extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @AllowNull(false)
    @Column
    departureCity: string

    @AllowNull(false)
    @Column
    arrivalCity: string

    @AllowNull(false)
    @Column
    departure: Date

    @AllowNull(false)
    @Column
    arrival: Date

    @AllowNull(false)
    @Column
    tickets: number
}

export default Flight
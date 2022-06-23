import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
class Booking extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @AllowNull(false)
    @Column
    user: number

    @AllowNull(false)
    @Column
    property: number

    @AllowNull(false)
    @Column
    dateIn: Date

    @AllowNull(false)
    @Column
    dateOut: Date
}

export default Booking
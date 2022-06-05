import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table
class Flight extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({ type : DataType.INTEGER })
    id: number

    @Unique
    @AllowNull(false)
    @Column({ type: DataType.STRING })
    code: string

    @Column({ type: DataType.INTEGER })
    ticketsTotal: number

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    departureFrom: string

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    arrivalTo: string

    @AllowNull(false)
    @Column({ type: DataType.DATE })
    departure: Date

    @AllowNull(false)
    @Column({ type: DataType.DATE })
    arrival: Date

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    planeCode: string
}

export default Flight
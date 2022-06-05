import { Table, Model, AutoIncrement, PrimaryKey, Column, DataType, AllowNull, ForeignKey } from "sequelize-typescript";

@Table
class Ticket extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    id: number

    @AllowNull(false)
    @Column
    flightId: number

    @AllowNull(false)
    @Column
    userId: number
}

export default Ticket

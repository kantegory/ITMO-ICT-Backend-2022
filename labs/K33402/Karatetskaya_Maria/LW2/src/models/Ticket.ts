import { Table, Model, AutoIncrement, PrimaryKey, Column, DataType, AllowNull, ForeignKey } from "sequelize-typescript";
import Flight from "./Flight";
import User from "./User";

@Table
class Ticket extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column({ type: DataType.INTEGER })
    id: number

    @AllowNull(false)
    @ForeignKey(() => Flight)
    @Column
    flightId: number

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number
}

export default Ticket

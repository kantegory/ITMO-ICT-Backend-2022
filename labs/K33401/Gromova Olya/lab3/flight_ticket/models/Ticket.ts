import { Table, Model, Column, PrimaryKey, AllowNull, AutoIncrement } from "sequelize-typescript"

@Table
class Ticket extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number

    @AllowNull(false)
    @Column
    flight: number

    @AllowNull(false)
    @Column
    user: number

    @AllowNull(false)
    @Column
    boughtAt: Date

    @AllowNull(false)
    @Column
    status: string
}

export default Ticket
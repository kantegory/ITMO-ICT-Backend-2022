import { Table, Model, PrimaryKey, AutoIncrement, Column, AllowNull } from "sequelize-typescript"

@Table
class Property extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @AllowNull(false)
    @Column
    city: string

    @AllowNull(false)
    @Column
    address: string

    @Column
    description: string

    @AllowNull(false)
    @Column
    maxGuestCount: number

    @AllowNull(false)
    @Column
    type: string

    @AllowNull(false)
    @Column
    pricePerDay: number
}

export default Property
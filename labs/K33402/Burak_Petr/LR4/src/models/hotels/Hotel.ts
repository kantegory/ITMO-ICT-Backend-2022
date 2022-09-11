import { AllowNull, Column, Model, Table } from 'sequelize-typescript'

@Table
class HotelModel extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    rating: number

    @AllowNull(false)
    @Column
    location: string

    @Column
    averagePrice: number
}

export default HotelModel

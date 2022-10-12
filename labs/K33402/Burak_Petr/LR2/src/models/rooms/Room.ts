import { AllowNull, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import HotelModel from '../hotels/Hotel'

@Table
class RoomModel extends Model {
    @AllowNull(false)
    @Column
    bedsCount: number

    @AllowNull(false)
    @Column
    price: number

    @Column
    description: string

    @Column
    mealType: string

    @AllowNull(false)
    @ForeignKey(() => HotelModel)
    @Column
    hotelId: number
}

export default RoomModel

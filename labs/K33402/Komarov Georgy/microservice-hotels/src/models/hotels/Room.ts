import {
    AllowNull,
    BelongsTo,
    Column,
    ForeignKey,
    IsInt,
    Length,
    Min,
    Model,
    NotNull,
    Table,
} from 'sequelize-typescript'
import Hotel from './Hotel'

@Table
class Room extends Model {
    @NotNull
    @AllowNull(false)
    @ForeignKey(() => Hotel)
    @Column
    hotelId: number

    @BelongsTo(() => Hotel)
    hotel: Hotel

    @Min(1)
    @IsInt
    @NotNull
    @AllowNull(false)
    @Column
    capacity: number

    @Min(0.01)
    @NotNull
    @AllowNull(false)
    @Column
    price: number

    @Length({ min: 1, max: 255 })
    @NotNull
    @AllowNull(false)
    @Column
    description: string
}

export default Room

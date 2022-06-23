import { AllowNull, Column, HasMany, IsInt, Length, Max, Min, Model, NotNull, Table } from 'sequelize-typescript'
import Room from './Room'

@Table
class Hotel extends Model {
    @Length({ min: 1, max: 50 })
    @NotNull
    @AllowNull(false)
    @Column
    name: string

    @Length({ min: 1, max: 50 })
    @NotNull
    @AllowNull(false)
    @Column
    city: string

    @Min(1)
    @Max(5)
    @IsInt
    @NotNull
    @AllowNull(false)
    @Column
    stars: number

    @HasMany(() => Room)
    rooms: Room[]
}

export default Hotel

import { AllowNull, Column, IsInt, Length, Max, Min, Model, NotNull, Table } from 'sequelize-typescript'

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
}

export default Hotel

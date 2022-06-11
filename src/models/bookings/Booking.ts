import { AllowNull, BelongsTo, Column, ForeignKey, Is, IsDate, Model, NotNull, Table } from 'sequelize-typescript'
import Room from '../hotels/Room'
import User from '../users/User'
import { datesValidator, isInFutureValidator } from '../../utils/validators'

@Table({
    validate: {
        datesValidator,
    },
})
class Booking extends Model {
    @NotNull
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @NotNull
    @AllowNull(false)
    @ForeignKey(() => Room)
    @Column
    roomId: number

    @BelongsTo(() => Room)
    room: Room

    @Is('inFuture', isInFutureValidator)
    @IsDate
    @NotNull
    @AllowNull(false)
    @Column
    dateFrom: Date

    @IsDate
    @NotNull
    @AllowNull(false)
    @Column
    dateTo: Date
}

export default Booking

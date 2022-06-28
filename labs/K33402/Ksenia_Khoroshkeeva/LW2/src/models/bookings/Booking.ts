import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey,
    BelongsTo,
    BeforeValidate,
    IsDate,
    DefaultScope
} from "sequelize-typescript";
import User from "../users/User";
import Room from "../hotels/Room";
import {DataTypes} from "sequelize";
import Hotel from "../hotels/Hotel";

@DefaultScope(() => ({
    attributes: ['id', 'startDate', 'endDate'],
    include: [{
        model: Room,
        attributes: ['id', 'name', 'capacity', 'price'],
        include: [{
            model: Hotel,
            attributes: ['id', 'name', 'city', 'stars']
        }],
        nest: true
    }],
    nest: true
}))
@Table
class Booking extends Model {
    @IsDate
    @AllowNull(false)
    @Column(DataTypes.DATEONLY)
    startDate: any;

    @IsDate
    @AllowNull(false)
    @Column(DataTypes.DATEONLY)
    endDate: any;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Room)
    @Column
    roomId: number;

    @BelongsTo(() => Room)
    room: Room;

    @BeforeValidate
    static validateDates(instance: Booking) {
        // Проверка правильности дат
        if (instance.startDate >= instance.endDate) {
            throw new Error('Дата начала должна быть раньше даты конца');
        }
    }
}

export default Booking;

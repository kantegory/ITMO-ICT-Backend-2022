import {
    Table,
    Column,
    Model,
    AllowNull,
    BeforeValidate,
    IsDate,
    DefaultScope
} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@DefaultScope(() => ({
    attributes: ['id', 'startDate', 'endDate', 'roomId'],
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

    @AllowNull(false)
    @Column
    userId: number;

    @AllowNull(false)
    @Column
    roomId: number;

    @BeforeValidate
    static validateDates(instance: Booking) {
        // Проверка правильности дат
        if (instance.startDate >= instance.endDate) {
            throw new Error('Дата начала должна быть раньше даты конца');
        }
    }
}

export default Booking;

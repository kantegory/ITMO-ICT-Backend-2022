import {Optional, Model, DataTypes} from "sequelize";
import {sequelize} from "../index";
import User from "../user/user";
import Restaurant from "../restaurant/restaurant";

interface BookingAttributes {
    username: string,
    restaurant_name: string,
    time: Date,
    amount_of_people: number,
    info: string
}

interface BookingCreationAttributes
    extends Optional<BookingAttributes, 'info'> {}

interface BookingInstance extends Model<BookingAttributes, BookingCreationAttributes>, BookingAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Booking = sequelize.define<BookingInstance>(
    'Booking',
    {
        username: {
            type: DataTypes.STRING,
        },
        restaurant_name: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.DATE,
        },
        amount_of_people: {
            type: DataTypes.NUMBER,
        },
        info: {
            type: DataTypes.STRING,
        }
    }
)

export default Booking
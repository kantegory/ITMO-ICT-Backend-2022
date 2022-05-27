import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '..';

interface BookingAttributes {
  userId: number;
  roomId: number;
  checkinDate: Date;
  checkoutDate: Date;
}
interface BookingCreationAttributes
  extends Optional<BookingAttributes, 'userId'> { }

interface BookingInstance extends Model<BookingAttributes, BookingCreationAttributes>, BookingAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Booking = sequelize.define<BookingInstance>(
  'Bookings',
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    roomId: {
      type: DataTypes.NUMBER
    },
    checkinDate: {
      type: DataTypes.DATE
    },
    checkoutDate: {
      type: DataTypes.DATE
    }
  }
);

export default Booking
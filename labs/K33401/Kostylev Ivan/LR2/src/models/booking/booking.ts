import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '..';
import User from '../user/user';
import Room from '../room/room';

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

Booking.hasOne(User, {
  foreignKey: 'userId',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

User.belongsTo(Booking)

Booking.hasOne(Room, {
  foreignKey: 'roomId',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
})

Room.belongsTo(Booking)

export default Booking
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import User from './user';
import Room from './room';

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

User.hasMany(Booking, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Booking.belongsTo(User)

Room.hasMany(Booking, {
  foreignKey: 'roomId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Booking.belongsTo(Room)

export default Booking
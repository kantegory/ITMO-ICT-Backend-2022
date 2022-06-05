import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Hotel from './hotel'

enum RoomType {
    ECONOMY = "economy",
    LUXE = "luxe",
    PRESIDENT = "president"
}

interface RoomAttributes {
    roomNumber: string;
    hotelId: number;
    capacity: number;
    class: RoomType;
    price: number
}
interface RoomCreationAttributes
    extends Optional<RoomAttributes, 'roomNumber'> { }

interface RoomInstance extends Model<RoomAttributes, RoomCreationAttributes>, RoomAttributes {}

const Room = sequelize.define<RoomInstance>(
    'Rooms',
    {
        roomNumber: {
            type: DataTypes.STRING,
        },
        hotelId: {
            type: DataTypes.INTEGER,
        },
        capacity: {
            type: DataTypes.INTEGER,
        },
        class: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DOUBLE,
        }
    }
);

Hotel.hasMany(Room, {
    foreignKey: 'hotelId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})

Room.belongsTo(Hotel)

export default Room
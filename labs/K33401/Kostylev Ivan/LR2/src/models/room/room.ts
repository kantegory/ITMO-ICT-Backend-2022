import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '..';
import Hotel from '../hotel/hotel'

enum RoomType {
    ECONOMY = "economy",
    LUXE = "luxe",
    PRESIDENT = "president"
}

interface RoomAttributes {
    number: number;
    hotelId: number;
    roomNumber: string;
    capacity: number;
    class: RoomType;
    price: number
}
interface RoomCreationAttributes
    extends Optional<RoomAttributes, 'number'> { }

interface RoomInstance extends Model<RoomAttributes, RoomCreationAttributes>, RoomAttributes {}

const Room = sequelize.define<RoomInstance>(
    'Rooms',
    {
        number: {
            type: DataTypes.INTEGER,
        },
        hotelId: {
            type: DataTypes.INTEGER,
        },
        roomNumber: {
            type: DataTypes.STRING,
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

Room.hasMany(Hotel, {
    foreignKey: 'hotelId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})

Hotel.belongsTo(Room)

export default Room
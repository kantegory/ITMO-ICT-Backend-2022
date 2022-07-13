import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface HotelAttributes {
    name: string;
    town: string;
}
interface HotelCreationAttributes
    extends Optional<HotelAttributes, 'name'> { }

interface HotelInstance extends Model<HotelAttributes, HotelCreationAttributes>, HotelAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Hotel = sequelize.define<HotelInstance>(
    'Hotels',
    {
        name: {
            type: DataTypes.STRING,
        },
        town: {
            type: DataTypes.STRING,
        }
    }
);

export default Hotel
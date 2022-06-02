import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    country: string;
};

interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> { }

interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const User = sequelize.define<UserInstance>(
    'User',
    {
        id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
        },
        firstName: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        lastName: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        email: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        password: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        country: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }
);

export default User 
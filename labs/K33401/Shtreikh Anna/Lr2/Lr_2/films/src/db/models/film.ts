import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface FilmAttributes {
    id: number;
    title: string;
    country: string;
    duration: number;
    genre: string;
    ageLimit: number;
    description: string;
};

interface FilmCreationAttributes
    extends Optional<FilmAttributes, 'id'> { }

interface FilmInstance
    extends Model<FilmAttributes, FilmCreationAttributes>,
    FilmAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Film = sequelize.define<FilmInstance>(
    'Film',
    {
        id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
        },
        title: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        country: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        duration: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        genre: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        ageLimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }
);

export default Film
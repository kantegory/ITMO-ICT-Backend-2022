import { DataTypes, Model, Optional } from 'sequelize';
import db from '../../config/database.config';

interface HotelAttributes {
	id: number;
    Name: string;
	Adress: string;
    Assess: number;

}

export class Hotel extends Model<HotelAttributes> {
	public id!: number
    public Name!: string
	public Adress!: string
	public Assess!: number

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Hotel.init(
	{
		id: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
		},
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
		Adress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Assess: {
            type: DataTypes.STRING,
            allowNull: false,
        },
	},
	{
		timestamps: true,
		sequelize: db,
		tableName: 'hotel',
	}
);
export interface HotelInput extends Optional<HotelAttributes, 'id' & 'Name' & 'Adress' & 'Assess'> {}
export interface HotelOuput extends Required<HotelAttributes> {}
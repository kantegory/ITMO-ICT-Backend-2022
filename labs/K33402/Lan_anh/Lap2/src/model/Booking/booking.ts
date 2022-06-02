import { DataTypes, Model, Optional } from 'sequelize';
import { idText } from 'typescript';
import db from '../../config/database.config';
import { Hotel } from '../Hotel/Hotel';
import { Client } from '../User/Users';

interface BookingAttributes {
	id: number;
    User_id: number;
	Hotel_id: number;
	Check_in: Date;
    Check_out: Date;
    Price: number;
}

export class Booking extends Model<BookingAttributes> {
	public id!: number
	public User_id!: number;
	public Hotel_id!: number;
	public Check_in!: Date;
	public Check_out!: Date;
	public Price!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Booking.init(
	{
		id: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
		},
        User_id: {
            type: DataTypes.NUMBER,
			references: {
				model: 'client',
				key: 'id',
			},
            allowNull: false,
        },
		Hotel_id: {
			type: DataTypes.NUMBER,
			references: {
				model: 'hotel',
				key: 'id',
			},
            allowNull: false,
		},
		Check_in: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Check_out:  {
            type: DataTypes.DATE,
            allowNull: false,
        },
		Price:  {
            type: DataTypes.NUMBER,
            allowNull: false,
        },

	},
	{
		timestamps: true,
		sequelize: db,
		tableName: 'booking',
	}
);
Client.hasMany(Booking)
Hotel.hasMany(Booking)
export interface BookingInput extends Optional<BookingAttributes, 'id' & 'User_id' & 'Hotel_id' & 'Check_in' & 'Check_out' & 'Price'> {}
export interface BookingOutput extends Required<BookingAttributes> {}

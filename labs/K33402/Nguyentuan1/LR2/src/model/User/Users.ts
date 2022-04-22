import { DataTypes, Model, Optional } from 'sequelize';
import db from '../../config/database.config';

interface ClientAttributes {
	id: number;
	firstname: string;
    lastname: string;
    email: string;
	password: string;
}

export class Client extends Model<ClientAttributes> {
	public id!: number
	public firstname!: string
	public lastname!: string
	public email!: string
	public password!: string

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

Client.init(
	{
		id: {
			type: DataTypes.NUMBER,
			primaryKey: true,
			allowNull: false,
		},
		firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
			unique: true,
        },
		password: {
			type: DataTypes.STRING,
            allowNull: false,
		}
	},
	{
		timestamps: true,
		sequelize: db,
		tableName: 'client',
	}
);
export interface ClientInput extends Optional<ClientAttributes, 'id' & 'firstname' & 'lastname' & 'email' & 'password'> {}
export interface ClientOuput extends Required<ClientAttributes> {}
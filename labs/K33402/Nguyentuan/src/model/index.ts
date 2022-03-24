import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/database.config';

interface TodoAttributes {
	id: number;
	firstname: string;
    lastname: string;
    email: string;
}

export class TodoInstance extends Model<TodoAttributes> {
	public id!: number
	public firstname!: string
	public lastname!: string
	public email!: string

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly deletedAt!: Date;
}

TodoInstance.init(
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
	},
	{
		timestamps: true,
		sequelize: db,
		tableName: 'todos',
	}
);
export interface TodoInput extends Optional<TodoAttributes, 'id' & 'firstname' & 'lastname' & 'email'> {}
export interface TodoOuput extends Required<TodoAttributes> {}
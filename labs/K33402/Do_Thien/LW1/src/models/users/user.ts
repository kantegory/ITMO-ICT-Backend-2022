import { Model, DataTypes, Optional } from 'sequelize'
import db from "../../configs/database.config"


interface UserAttributes {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    createAt?: Date,
    updateAt?: Date
}
export interface UserInput extends Optional<UserAttributes, 'id' | 'email' | 'firstName' | 'lastName' | 'age'> {}
export interface UserOutput extends Required<UserAttributes> {}


class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number
    public firstName!: string
    public lastName!: string
    public age!: number
    public email!: string
    
    public readonly createAt!: Date
    public readonly updateAt!: Date
}

User.init(
    {   
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },
    {   
        timestamps: true,
        sequelize: db,
        tableName: 'User'    }
)

export default User
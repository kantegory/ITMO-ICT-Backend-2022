import { DataType, Sequelize, Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement, Unique } from 'sequelize-typescript';

@Table
class User extends Model {
    
    createdAt?: false
    updatedAt?: false
    
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id!: number
    
    @Column({ type: DataType.STRING })
    firstName: string

    @Column({ type: DataType.STRING })
    lastName: string

    @Unique
    @Column({ type: DataType.STRING })
    username: string
};

export default User;
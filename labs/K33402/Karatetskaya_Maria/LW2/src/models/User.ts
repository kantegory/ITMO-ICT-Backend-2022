import { DataType, Sequelize, Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement, Unique } from 'sequelize-typescript';

@Table
class User extends Model {
    
    createdAt?: false
    updatedAt?: false
    
    @AutoIncrement
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    id!: number
    
    @Column({ type: DataType.STRING })
    firstName: string

    @Column({ type: DataType.STRING })
    lastName: string

    @Unique
    @AllowNull(false)
    @Column({ type: DataType.STRING })
    username: string

    @Unique
    @AllowNull(false)
    @Column({ type: DataType.STRING })
    email: string

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    password: string
};

export default User;
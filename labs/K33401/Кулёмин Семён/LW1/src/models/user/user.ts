import {AllowNull, Column, DataType, Model, Table, Unique} from "sequelize-typescript";

@Table
class User extends Model {
    @Unique
    @Column(DataType.TEXT)
    @AllowNull(false)
    username: string

    @Unique
    @Column(DataType.TEXT)
    @AllowNull(false)
    password: string

    @Unique
    @Column(DataType.TEXT)
    @AllowNull(false)
    email: string

    @Unique
    @Column(DataType.TEXT)
    @AllowNull(false)
    hometown: string
}

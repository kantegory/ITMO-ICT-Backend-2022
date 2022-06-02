import { Table, Column, Model, Unique } from "sequelize-typescript";

@Table
class User extends Model {
    @Column
    name: string;

    @Unique
    @Column
    email: string;

    @Column
    phone: string;

    @Column
    address: string;

    @Column
    age: number;

    @Column
    country: string;
}

export default User;

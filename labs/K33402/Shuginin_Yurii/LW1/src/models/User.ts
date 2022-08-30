import { Table, Column, Model, Unique, AllowNull } from 'sequelize-typescript'

@Table
class User extends Model {
    @Unique
    @AllowNull(false)
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @Column
    firstName: string
    
    @Column
    lastName: string
    
    @Column
    birthday: Date

    @Column
    nationality: string

    @Unique
    @Column
    passport: string
}

export default User
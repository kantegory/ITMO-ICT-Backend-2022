import {
    AllowNull,
    Column,
    ForeignKey,
    Model,
    Table,
    Unique,
} from 'sequelize-typescript'
import UserModel from '../users/UserModel'

@Table
class RefreshToken extends Model {
    @Unique
    @AllowNull(false)
    @Column
    token: string

    @ForeignKey(() => UserModel)
    @Column
    userId: number
}

export default RefreshToken

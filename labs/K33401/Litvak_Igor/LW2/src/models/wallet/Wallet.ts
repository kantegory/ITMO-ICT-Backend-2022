import {Model, Table, Column, Default, AllowNull, ForeignKey, BelongsTo, BelongsToMany} from 'sequelize-typescript'
import Coin from './Coin'
import CoinWallet from './CoinWallet'
import User from '../users/User'


@Table
class Wallet extends Model {
    @AllowNull(false)
    @Column
    name: string

    @Default(0)
    @Column
    balance: number

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @BelongsToMany(() => Coin, () => CoinWallet)
    coins: Coin[]
}

export default Wallet

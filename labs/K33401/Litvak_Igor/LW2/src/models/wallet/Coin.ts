import {Model, Table, Column, AllowNull, PrimaryKey, BelongsTo, BelongsToMany} from 'sequelize-typescript'
import Wallet from './Wallet'
import CoinWallet from './CoinWallet'


@Table
class Coin extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column
    ticker: string

    @BelongsToMany(() => Wallet, () => CoinWallet)
    wallets: Wallet[]
}

export default Coin

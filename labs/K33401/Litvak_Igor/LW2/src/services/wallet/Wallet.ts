import Wallet from '../../models/wallet/Wallet'
import User from '../../models/users/User'
import APIError from '../../errors/APIError'

class WalletService {
    async getById(id: number): Promise<Wallet | APIError> {
        const wallet = await Wallet.scope('nested').findByPk(id)
        if (wallet) {
            return wallet.toJSON()
        }
        throw new APIError('Wallet not found')
    }

    async getByUserId(userId: number): Promise<Wallet[]> {
        return await Wallet.scope('nested').findAll({where: {userId: userId}})
    }

    async create(walletData: any, user: User): Promise<Wallet | APIError> {
        try {
            const wallet = await Wallet.create({...walletData, userId: user.id})
            return wallet.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new APIError(errors)
        }
    }
}

export default WalletService

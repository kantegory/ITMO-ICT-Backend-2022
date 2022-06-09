import Wallet from '../../models/wallet/Wallet'
import APIError from '../../errors/APIError'

class WalletService {
    async getById(id: number): Promise<Wallet | APIError> {
        const wallet = await Wallet.findByPk(id)
        if (wallet) {
            return wallet.toJSON()
        }
        throw new APIError('Wallet not found')
    }

    async getByUserId(userId: number): Promise<Wallet[]> {
        return await Wallet.findAll({where: {userId: userId}, raw: true})
    }

    async create(walletData: any): Promise<Wallet | APIError> {
        try {
            const wallet = await Wallet.create(walletData)
            return wallet.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new APIError(errors)
        }
    }
}

export default WalletService

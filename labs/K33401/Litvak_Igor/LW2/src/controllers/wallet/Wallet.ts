import Wallet from '../../models/wallet/Wallet'
import WalletService from '../../services/wallet/Wallet'
import APIError from '../../errors/APIError'


class WalletController {
    private walletService: WalletService

    constructor() {
        this.walletService = new WalletService()
    }

    get = async (request: any, response: any) => {
        const {user} = request
        const {id} = request.params
        if (user) {
            try {
                const wallet: Wallet | APIError = await this.walletService.getById(id)
                if (!(wallet instanceof APIError) && wallet.userId === user.id) {
                    response.status(200).send(wallet)
                } else {
                    response.status(404).send({'detail': 'Wallet not found'})
                }
            } catch (error: any) {
                response.status(404).send({'detail': error.message})
            }
        } else {
            response.status(401).send({'detail': 'Not authenticated'})
        }
    }

    getAll = async (request: any, response: any) => {
        const {user} = request
        if (user) {
            response.send(await this.walletService.getByUserId(user.id))
        } else {
            response.status(401).send({'detail': 'Not authenticated'})
        }
    }

    post = async (request: any, response: any) => {
        const {body} = request
        try {
            const wallet: Wallet | APIError = await Wallet.create(body)
            response.status(201).send(wallet)
        } catch (error: any) {
            response.status(400).send({'detail': error.message})
        }
    }
}

export default WalletController

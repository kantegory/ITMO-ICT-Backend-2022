import express from 'express'
import userRoutes from './users/User'
import authRoutes from './auth/Auth'
import walletRoutes from './wallet/Wallet'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/wallets', walletRoutes)

export default router

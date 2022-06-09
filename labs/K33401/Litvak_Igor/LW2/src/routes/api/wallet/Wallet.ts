import express from 'express'
import WalletController from '../../../controllers/wallet/Wallet'
import passport from "../../../middlewares/passport";

const router: express.Router = express.Router()

const controller = new WalletController()

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), controller.post)

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), controller.getAll)

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), controller.get)

export default router

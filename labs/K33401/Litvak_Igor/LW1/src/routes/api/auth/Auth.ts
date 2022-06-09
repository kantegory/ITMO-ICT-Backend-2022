import express from 'express'
import UserController from '../../../controllers/users/User'
import passport from '../../../middlewares/passport'

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/login')
    .post(controller.auth)

router.route('/refresh')
    .post(controller.refreshToken)

export default router
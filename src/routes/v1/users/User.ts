import express from 'express'
import UserController from '../../../controllers/users/User'
import { isAdmin, isAuthenticated } from '../../../utils/auth'

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/').post(controller.create)

router.route('/profile').get(isAuthenticated, controller.me)

router.route('/profile/:id').get(isAuthenticated, isAdmin, controller.retrieve)

router.route('/login').post(controller.login)

router.route('/refresh').post(controller.refreshToken)

export default router

import express from 'express'
import UserController from '../../../controllers/users/UserController'
import { isLogged } from '../../../utils/permissions'

const userRouter: express.Router = express.Router()
const controller: UserController = new UserController()

userRouter.route('/').post(controller.post)
userRouter.route('/profile').get(isLogged, controller.me)
userRouter.route('/profile/:id').get(controller.get)
userRouter.route('/login').post(controller.auth)
userRouter.route('/refresh').post(controller.refreshToken)

export default userRouter

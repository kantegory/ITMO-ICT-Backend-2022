import UserController from "../../controllers/User/User";
import express from "express";
import auth from "../../middleware/Auth/auth"

const userRouter = express.Router()

const userController: UserController = new UserController()

userRouter.route('/signin').post(userController.login)
userRouter.route('/register').post(userController.register)
userRouter.route('/me').get(auth.auth, userController.me)
userRouter.route('/reset').post(auth.auth, userController.updatePassword)
userRouter.route('/user/secret/getById/:id').get(userController.secretGetUser)

export default userRouter
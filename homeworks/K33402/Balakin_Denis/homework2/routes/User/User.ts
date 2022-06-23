import UserController from "../../controllers/User/User";
import express from "express";

const userRouter = express.Router()

const userController: UserController = new UserController()

userRouter.route('/user').get(userController.get)
userRouter.route('/user').post(userController.create)

export default userRouter
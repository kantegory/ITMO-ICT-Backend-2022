import express from "express"
import UserController from "../controllers/user/index"

const router: express.Router = express.Router()

const userController = new UserController()

router
    .route('/user')
    .get(userController.get)
    .post(userController.post)

export default router
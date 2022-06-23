import UserController from "../controllers/User";
import express from "express";

import auth from "../middleware/authenticate"

const router = express.Router()
const userController: UserController = new UserController()

router.route('/register').post(userController.register)
router.route('/login').post(userController.login)
router.route('/user').get(auth.authenticate, userController.currentUser)
router.route('/users').get(auth.authenticate, userController.getAll)

export default router
import express from "express";
import UserController from "../controllers/User";

const router: express.Router = express.Router()
var userController: UserController = new UserController()
console.log(userController)

router.route('/users').get(userController.getAll)
router.route('/users/:id').get(userController.get)

export default router
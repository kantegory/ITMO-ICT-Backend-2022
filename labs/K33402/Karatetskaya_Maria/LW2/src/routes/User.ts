import express from "express";
import UserController from "../controllers/User";

const router: express.Router = express.Router()
const userController: UserController = new UserController()

router.route('/users').get(userController.getAll)
router.route('/users/:id').get(userController.get)
router.route('/users').post(userController.create)
router.route('/users').put(userController.update)
router.route('/users/:id').delete(userController.delete)

export default router
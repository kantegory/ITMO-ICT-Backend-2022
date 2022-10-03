import express from "express"
import UserController from '../../controllers/users/UserController'

const router: express.Router = express.Router()

const userController : UserController = new UserController()

router.route('/all')
    .get(userController.all)

router.route('/:id')
    .get(userController.get)
    .delete(userController.delete)

router.route('/')
    .post(userController.post)
    .put(userController.update)

export default router
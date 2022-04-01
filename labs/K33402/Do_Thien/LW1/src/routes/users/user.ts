import express from "express"
import UserController from '../../controllers/users/user'

const router: express.Router = express.Router()

const userController = new UserController()

router.post(
    '/create', 
    userController.post
)

router.get(
    '/user/:id',
    userController.get
)

router.get(
    '/user',
    userController.all
)

router.put(
    '/user/:id',
    userController.update
)

router.get(
    '/user/delete/:id',
    userController.delete
)

export default router
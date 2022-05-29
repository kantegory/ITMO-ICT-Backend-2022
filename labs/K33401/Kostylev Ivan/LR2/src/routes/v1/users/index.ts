import express from "express";
import UserController from "../../../controllers/users/index";

const router: express.Router = express.Router()

const controller = new UserController()

router.route('/').get(controller.getHello)

router.route('/new/')
    .post(controller.createUser)

router.route('/')
    .get(controller.getAll)

router.route('/:id')
    .get(controller.getById)

router.route('users/:id')
    .put(controller.updateUser)

router.route('/age/:age')
    .get(controller.getByAge)

export default router
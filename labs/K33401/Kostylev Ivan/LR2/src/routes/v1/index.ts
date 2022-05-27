import express from "express";
import UserController from "../../controllers/users/index";

const router: express.Router = express.Router()

const controller = new UserController()

router.route('/').get(controller.getHello)

router.route('/users/new/')
    .post(controller.createUser)

router.route('/users')
    .get(controller.getAll)

router.route('/users/:id')
    .get(controller.getById)

router.route('/users/age/:age')
    .get(controller.getByAge)

export default router
import express from "express";
import UserController from "../../../controllers/users/user";

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/')
    .post(controller.post)

router.route('/profile/:id')

export default router
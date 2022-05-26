import express from "express";
import UserController from "../../controllers/users/index";

const router: express.Router = express.Router()

const controller = new UserController()

router.route('/').get(controller.get)

export default router
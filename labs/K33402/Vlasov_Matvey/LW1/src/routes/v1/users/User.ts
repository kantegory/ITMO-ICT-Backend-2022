
import express from "express"
import UserController from "../../../controllers/users/User"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route("/create").post(controller.create)

router.route("/:id").get(controller.retrieve)

router.route("/login").post(controller.login)

export default router
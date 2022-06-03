
import express from "express"
import UserController from "../../controllers/User"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route("/create").post(controller.create)

router.route("/get/:id").get(controller.retrieve)

router.route("/update/:id").post(controller.update)

router.route("/delete/:id").post(controller.delete)

router.route("/list").get(controller.getList)

router.route("/login").post(controller.login)

export default router
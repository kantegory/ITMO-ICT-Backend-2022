import express from "express"
import UserController from "../controllers/UserController"

const router = express.Router()

const controller = new UserController()

router.route("/:id")
    .get(controller.get)

router.route("/")
    .get(controller.list)

router.route("/")
    .post(controller.create)

router.route("/:id")
    .delete(controller.delete)

router.route("/:id")
    .patch(controller.update)

export default router

import express from "express"
import UserController from "../controllers/UserController"

const router = express.Router()

const controller = new UserController()

router.route("/")
  .post(controller.post)

router.route("/whoami")
  .get(controller.whoAmI)

router.route("/auth")
  .post(controller.auth)

router.route("/:id")
  .get(controller.get)

export default router

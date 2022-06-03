import express from "express"
import AuthController from "../controllers/AuthController"

const router = express.Router()

const controller = new AuthController()

router.route("/")
  .post(controller.auth)

router.route("/change_token")
  .post(controller.changeToken)

router.route("/")
  .delete(controller.delete)

export default router

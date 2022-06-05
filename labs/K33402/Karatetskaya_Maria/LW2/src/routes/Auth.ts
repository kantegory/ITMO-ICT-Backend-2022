import express from "express";
import AuthController from "../controllers/Auth";

const router: express.Router = express.Router()
const controller: AuthController = new AuthController

router.route("/login").post(controller.login)
router.route("/refresh").post(controller.refreshToken)

export default router

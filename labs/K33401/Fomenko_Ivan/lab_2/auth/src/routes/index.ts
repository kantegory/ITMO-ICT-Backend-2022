import express from "express"
import AuthController from "../controllers/index"

const router: express.Router = express.Router()

const authController = new AuthController()

router
    .route('/auth')
    .post(authController.post)

export default router
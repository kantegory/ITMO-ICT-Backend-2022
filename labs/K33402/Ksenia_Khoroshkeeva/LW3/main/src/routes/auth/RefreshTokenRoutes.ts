import express from "express";
import RefreshTokenController from "../../controllers/auth/RefreshTokenController";

const router: express.Router = express.Router();

const controller: RefreshTokenController = new RefreshTokenController();

router.route('/login')
    .post(controller.auth);

router.route('/refresh')
    .post(controller.refreshToken);

export default router;

import express from "express";
import UserController from "../../controllers/users/UserController";
import passport from "../../middlewares/passport";

const router: express.Router = express.Router();

const controller: UserController = new UserController();

router.route('/')
    .post(controller.create);

router.route('/profile')
    .get(passport.authenticate('jwt', { session: false }), controller.getMe);

router.route('/profile')
    .patch(passport.authenticate('jwt', { session: false }), controller.updateMe);

export default router;

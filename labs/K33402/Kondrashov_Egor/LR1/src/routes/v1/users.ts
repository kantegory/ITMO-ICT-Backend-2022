
import { Router } from 'express';
import UserController from "../../controllers/users/User";
import passport from "../../middleware/passport";

const router = Router();

const controller = new UserController()

router.route('/me')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

router.route('/:id')
    .get(controller.retrieve)

export default router

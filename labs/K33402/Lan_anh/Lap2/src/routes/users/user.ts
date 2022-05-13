import { Router } from 'express';
import passport from "../../middleware/passport";
import MeController from '../../controllers/users/index'

const router = Router();
const meController = new MeController()

router.get(
    '/me',
    passport.authenticate('jwt', {session: false}), meController.me
)

export default router
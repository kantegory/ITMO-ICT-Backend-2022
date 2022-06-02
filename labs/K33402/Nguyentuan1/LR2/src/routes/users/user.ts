import { Router } from 'express';
import passport from "../../middleware/passport";
import MeController from '../../controllers/users/index'

const router = Router();
const meController = new MeController()

router.get(
    '/me',
    passport.authenticate('jwt', {session: false}), meController.me
)

router.post(
    '/create/user',
    meController.create
)

router.get(
    '/getdata/:id',
    meController.get
)

router.get(
    '/getdata',
    meController.getall
)

router.put(
    '/update/:id',
    meController.update
)

router.delete(
    '/delete/:id',
    meController.delete
)

export default router
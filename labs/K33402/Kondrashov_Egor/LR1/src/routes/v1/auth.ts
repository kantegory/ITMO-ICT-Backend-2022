import { Router } from 'express';
import AuthController from "../../controllers/auth/Auth";


const router = Router();
const controller  = new AuthController()

router.route('/login').post(controller.login);
router.route('/register').post(controller.register);

export default router;

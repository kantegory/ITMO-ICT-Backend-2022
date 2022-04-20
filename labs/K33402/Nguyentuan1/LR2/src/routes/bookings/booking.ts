import BookController from "../../controllers/bookings/booking";
import { Router } from 'express';
import passport from "../../middleware/passport"

const router = Router();
const controller = new BookController()

router.post(
    '/create',
    passport.authenticate('jwt', {session: false}), controller.create
)

router.get(
    '/mybooking',
    passport.authenticate('jwt', {session: false}), controller.getall
)

export default router
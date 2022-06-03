
import { Router } from 'express';
import BookingController from "../../../controllers/bookings/Booking";
import passport from "../../../middleware/passport";

const router = Router();

const controller = new BookingController()

router.route('')
    .post(passport.authenticate('jwt', { session: false }), controller.create)

router.route('/my-bookings')
    .get(passport.authenticate('jwt', { session: false }), controller.list)

router.route('/:id')
    .get(controller.retrieve)

export default router


import { Router } from 'express';
import BookingController from "../../../controllers/bookings/Booking";

const router = Router();

const controller = new BookingController()

router.route('')
    .post(controller.create)

router.route('/my-bookings')
    .get(controller.list)

router.route('/:id')
    .get(controller.retrieve)

export default router

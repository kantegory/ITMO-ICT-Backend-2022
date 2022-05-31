import express from "express";
import BookingController from "../../../controllers/bookings";

const router: express.Router = express.Router()

const controller = new BookingController()

router.route('/new')
    .post(controller.createBooking)

router.route('/:id')
    .delete(controller.deleteBookingById)

export default router
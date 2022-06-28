import express from "express";
import BookingController from "../../controllers/bookings/BookingController";

const router: express.Router = express.Router();

const controller: BookingController = new BookingController();

router.route('/')
    .get(controller.list);

router.route('/:id')
    .get(controller.get);

router.route('/')
    .post(controller.create);

export default router;

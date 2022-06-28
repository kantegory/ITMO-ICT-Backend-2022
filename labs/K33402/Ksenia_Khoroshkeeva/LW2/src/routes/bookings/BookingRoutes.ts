import express from "express";
import BookingController from "../../controllers/bookings/BookingController";
import passport from "../../middlewares/passport";

const router: express.Router = express.Router();

const controller: BookingController = new BookingController();

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), controller.list);

router.route('/:id')
    .get(passport.authenticate('jwt', { session: false }), controller.get);

router.route('/')
    .post(passport.authenticate('jwt', { session: false }), controller.create);

export default router;

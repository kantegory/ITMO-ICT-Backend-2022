import express from "express";
import BookingController from "../../../controllers/bookings";
import passport from "../../../middlewares/password";

const router: express.Router = express.Router()

const controller: BookingController = new BookingController()

router.route('/add')
    .post(passport.authenticate('jwt', { session: false }), controller.post)

router.route('/bookings')
    .get(passport.authenticate('jwt', { session: false }), controller.getAll)

router.route('/username/:username')
    .get(passport.authenticate('jwt', { session: false }), controller.getByUsername)

router.route('/restaurant/:restaurant_name')
    .get(passport.authenticate('jwt', { session: false }), controller.getByRestaurant)

export default router
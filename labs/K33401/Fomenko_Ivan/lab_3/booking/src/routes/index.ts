import express from "express"
import UserController from "../controllers/user"
import HotelController from "../controllers/hotel"
import BookingController from "../controllers/booking"
import passport from "passport"

const router: express.Router = express.Router()

const userController = new UserController()
const hotelController = new HotelController()
const bookingController = new BookingController()

router
    .route('/user')
    .get(userController.get)
    .post(userController.post)


router
    .route('/hotel')
    .get(hotelController.get)
    .post(hotelController.post)


router
    .route('/bookings')
    .get(passport.authenticate('jwt', { session: false }), bookingController.get)
    .post(passport.authenticate('jwt', { session: false }), bookingController.post)

export default router
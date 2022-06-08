import express from "express"
import UserController from "../controllers/user/index"
import HotelController from "../controllers/hotel"
import BookingController from "../controllers/booking"

const router: express.Router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')


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
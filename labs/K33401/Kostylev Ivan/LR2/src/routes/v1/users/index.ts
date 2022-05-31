import express from "express";
import UserController from "../../../controllers/users";
import BookingController from "../../../controllers/bookings"
import passport from "../../../middleware/password";

const router: express.Router = express.Router()

const controller = new UserController()
const bookingController = new BookingController()


router.route('/login')
    .post(controller.login)

router.route('/new')
    .post(controller.createUser)

router.route('/all')
    .get(controller.getAll)

router.route('/profile')
    .get(passport.authenticate('jwt', { session: false }), controller.getAboutUser)

router.route('/id/:id')
    .get(passport.authenticate('jwt', { session: false }), controller.getById)

router.route('/bookings/:id')
    .get(passport.authenticate('jwt', { session: false }), bookingController.getByUserId)

router.route('/update/:id')
    .put(passport.authenticate('jwt', { session: false }), controller.updateUser)

export default router
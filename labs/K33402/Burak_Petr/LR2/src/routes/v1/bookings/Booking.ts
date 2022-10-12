import express from 'express'
import passport from '../../../middlewares/passport'
import BookingController from '../../../controllers/bookings/Booking'

const router: express.Router = express.Router()

const controller: BookingController = new BookingController()

router.route('/').post(passport.authenticate('jwt', { session: false }), controller.create)
router.route('/my').get(passport.authenticate('jwt', { session: false }), controller.list)

export default router

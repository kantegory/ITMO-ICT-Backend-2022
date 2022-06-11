import express from 'express'
import BookingController from '../../../controllers/bookings/Booking'
import { isAuthenticated } from '../../../utils/auth'

const bookingRoutes = express.Router()

const bookingController = new BookingController()

bookingRoutes.route('/').post(isAuthenticated, bookingController.create)
bookingRoutes.route('/').get(isAuthenticated, bookingController.list)
bookingRoutes.route('/:id(\\d+)').get(isAuthenticated, bookingController.retrieve)

export default bookingRoutes

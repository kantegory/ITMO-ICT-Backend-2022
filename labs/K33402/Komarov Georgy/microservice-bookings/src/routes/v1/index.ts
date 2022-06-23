import express from 'express'
import userRoutes from './users/User'
import bookingRoutes from './bookings/Booking'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/bookings', bookingRoutes)

export default router

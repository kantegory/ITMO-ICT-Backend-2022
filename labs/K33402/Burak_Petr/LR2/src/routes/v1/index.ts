import express from 'express'
import userRoutes from './users/User'
import hotelRoutes from './hotels/Hotel'
import roomRoutes from './rooms/Room'
import bookingRoutes from './bookings/Booking'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/hotels', hotelRoutes)
router.use('/rooms', roomRoutes)
router.use('/bookings', bookingRoutes)

export default router

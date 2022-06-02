import express from "express"
import userRoutes from "./users/index"
import bookingRoutes from "./bookings/index"
import restaurantRoutes from "./restaurants/index"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/bookings', bookingRoutes)
router.use('/restaurant', restaurantRoutes)

export default router
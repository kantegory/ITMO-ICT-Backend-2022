import express from "express"
import propertyRoutes from "./property/Property"
import bookingRoutes from "./bookings/Booking"

const router: express.Router = express.Router()

router.use('/property', propertyRoutes)
router.use('/bookings', bookingRoutes)

export default router
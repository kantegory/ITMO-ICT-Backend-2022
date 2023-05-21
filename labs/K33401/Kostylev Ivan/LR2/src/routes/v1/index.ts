import express from "express"
import userRouter from "./users/index"
import roomRouter from "./rooms/index"
import hotelRouter from "./hotels/index"
import bookingRouter from "./bookings/index"

const router: express.Router = express.Router()

router.use('/users', userRouter)
router.use('/rooms', roomRouter)
router.use('/hotels', hotelRouter)
router.use('/bookings', bookingRouter)

export default router
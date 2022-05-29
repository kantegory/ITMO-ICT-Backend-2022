import express from "express"
import userRoutes from "./users/index"
import roomRoutes from "./rooms/index"
import hotelRoutes from "./hotels/index"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/rooms', roomRoutes)
router.use('/hotel', hotelRoutes)

export default router
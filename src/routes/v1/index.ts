import express from 'express'
import userRoutes from './users/User'
import hotelRoutes from './hotels/Hotel'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/hotels', hotelRoutes)

export default router

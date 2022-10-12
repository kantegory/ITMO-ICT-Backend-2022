import express from 'express'
import hotelRoutes from './hotels/Hotel'

const router: express.Router = express.Router()

router.use('/hotels', hotelRoutes)
export default router

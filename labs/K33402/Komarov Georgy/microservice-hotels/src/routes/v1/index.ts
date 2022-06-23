import express from 'express'
import hotelRoutes from './hotels/Hotel'
import roomRoutes from './hotels/Room'

const router: express.Router = express.Router()

router.use('/hotels', hotelRoutes)
router.use('/rooms', roomRoutes)

export default router

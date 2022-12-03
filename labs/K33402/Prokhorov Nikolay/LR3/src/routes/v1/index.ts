import express from 'express'
import userRoutes from './users/UserRouter'
import flightRouter from './flights/FlightRouter'
import seatRouter from './seats/SeatRouter'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/flights', flightRouter)
router.use('/seats', seatRouter)

export default router

import express from 'express'
import userRoutes from './users/UserRouter'
import flightRouter from './flights/FlightRouter'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/flights', flightRouter)

export default router

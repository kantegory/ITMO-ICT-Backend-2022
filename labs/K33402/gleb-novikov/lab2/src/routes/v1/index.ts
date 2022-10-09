import express from 'express'
import userRoutes from './users/UserRouter'
import flightRouter from './flights/FlightRouter'
import seatRouter from './seats/SeatRouter'
import ticketRouter from './tickets/TicketRouter'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/flights', flightRouter)
router.use('/seats', seatRouter)
router.use('/tickets', ticketRouter)

export default router

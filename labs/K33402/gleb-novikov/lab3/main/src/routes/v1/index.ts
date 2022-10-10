import express from 'express'
import userRoutes from './users/UserRouter'
import ticketRouter from './tickets/TicketRouter'
import flightRouter from '../../../../microservice-flights/src/routes/v1/flights/FlightRouter'
import seatRouter from '../../../../microservice-flights/src/routes/v1/seats/SeatRouter'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/tickets', ticketRouter)
router.use('/flights', flightRouter)
router.use('/seats', seatRouter)

export default router

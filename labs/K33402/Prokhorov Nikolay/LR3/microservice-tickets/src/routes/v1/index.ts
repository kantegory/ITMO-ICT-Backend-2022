import express from 'express'
import userRoutes from './users/UserRouter'
import ticketRouter from './tickets/TicketRouter'

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/tickets', ticketRouter)

export default router

import TicketController from "../controllers/Ticket";
import express from "express"
import authMiddleware from "../middleware/authenticate"

const router = express.Router()
const controller: TicketController = new TicketController()

router.route('/flights/:id/ticket').post(authMiddleware.authenticate, controller.buy)
router.route('/tickets').get(authMiddleware.authenticate, controller.getAll)
router.route('/tickets/:id').get(authMiddleware.authenticate, controller.get)
router.route('/tickets/:id').delete(authMiddleware.authenticate, controller.delete)

export default router
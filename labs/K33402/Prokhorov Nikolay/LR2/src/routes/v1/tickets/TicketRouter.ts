import useCrudRouter from '../../../composables/useCrudRouter'
import TicketController from '../../../controllers/tickets/TicketController'

const ticketRouter = useCrudRouter(TicketController)

export default ticketRouter
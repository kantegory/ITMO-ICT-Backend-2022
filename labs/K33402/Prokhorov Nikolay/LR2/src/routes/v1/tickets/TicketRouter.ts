import useCrudRouter from '../../../composables/useCrudRouter'
import TicketController from '../../../controllers/tickets/TicketController'
import { isLogged } from '../../../utils/permissions'

const {router: ticketRouter, controller} = useCrudRouter(TicketController)

ticketRouter.route('/my').get(isLogged, controller.my.bind(controller))

export default ticketRouter
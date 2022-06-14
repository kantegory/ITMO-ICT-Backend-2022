import useCrudController from '../../composables/useCrudController'
import TicketModel from '../../models/tickets/TicketModel'
import TicketService from '../../services/tickets/TicketService'

export default class TicketController extends useCrudController(
    TicketModel,
    TicketService
) {}

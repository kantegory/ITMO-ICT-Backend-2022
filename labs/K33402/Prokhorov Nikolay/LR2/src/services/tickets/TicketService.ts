import useCrudService from '../../composables/useCrudService'
import TicketModel from '../../models/tickets/TicketModel'

export default class TicketService extends useCrudService(TicketModel) {
    async my(userId: number) {
        return await TicketModel.findAll({ where: { createdBy: userId } })
    }
}

import useCrudService from '../../composables/useCrudService'
import TicketModel from '../../models/tickets/TicketModel'
import SeatModel from '../../models/seats/SeatModel'
import { ObjectNotFoundError } from '../../errors'

export default class TicketService extends useCrudService(TicketModel) {
    async create(data: Record<string, any>, userId: number) {
        const { seatId } = data
        if (!seatId) throw new Error('SeatId must be defined')

        const seatRequested = await SeatModel.findByPk(Number(seatId))
        const ticketsForSeat = await TicketModel.findAll({ where: { seatId } })

        if (!seatRequested || !ticketsForSeat) throw new ObjectNotFoundError()
        if (seatRequested.count <= ticketsForSeat.length) throw new Error('No more seats in this class available!')

        return super.create(data, userId)
    }

    async my(userId: number) {
        return await TicketModel.findAll({ where: { createdBy: userId } })
    }
}

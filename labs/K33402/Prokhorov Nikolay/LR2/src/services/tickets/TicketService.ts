import useCrudService from '../../composables/useCrudService'
import TicketModel from '../../models/tickets/TicketModel'
import SeatModel from '../../models/seats/SeatModel'

export default class TicketService extends useCrudService(TicketModel) {
    async create(data: Record<string, any>, userId: number) {
        const { seatId } = data
        if (!seatId) throw new Error('SeatId must be defined')

        const seatRequested = SeatModel.findByPk(Number(seatId))
        const ticketsForSeat = TicketModel.findAll({ where: seatId })

        console.log(seatRequested, ticketsForSeat)

        return super.create(data, userId)
    }

    async my(userId: number) {
        return await TicketModel.findAll({ where: { createdBy: userId } })
    }
}

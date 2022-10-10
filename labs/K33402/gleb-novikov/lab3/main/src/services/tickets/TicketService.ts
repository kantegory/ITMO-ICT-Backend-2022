import useCrudService from '../../composables/useCrudService'
import TicketModel from '../../models/tickets/TicketModel'
import { ObjectNotFoundError } from '../../errors'
import UserModel from '../../models/users/UserModel'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch')

export default class TicketService extends useCrudService(TicketModel) {
    async list() {
        return super.list({
            include: [UserModel],
        })
    }

    async create(data: Record<string, any>, userId: number) {
        const { seatId } = data
        if (!seatId) throw new Error('SeatId must be defined')

        const seatResponse = await fetch(`http://localhost:8001/v1/seats/${seatId}`)
        console.log(seatResponse)
        if (seatResponse.status !== 200) throw new Error('Such Seat not found')

        const seatRequested = await seatResponse.json()
        const ticketsForSeat = await TicketModel.findAll({ where: { seatId } })

        if (!seatRequested || !ticketsForSeat) throw new ObjectNotFoundError()
        if (seatRequested.count <= ticketsForSeat.length)
            throw new Error('No more seats in this class available!')

        return super.create(data, userId)
    }

    async my(userId: number) {
        return await TicketModel.findAll({
            where: { createdBy: userId },
        })
    }
}

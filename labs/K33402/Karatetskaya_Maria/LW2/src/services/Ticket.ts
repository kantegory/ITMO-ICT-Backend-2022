import Flight from "../models/Flight";
import Ticket from "../models/Ticket";

class TicketService {

    async remainingTicketCount(flightId: number) {
        const flight: Flight | null = await Flight.findByPk(flightId);
        if (!flight) {
            throw new Error("Invalid flightId")
        }
        
        const tickets: Ticket[] = await Ticket.findAll({ where: {
            flightId: flightId
        }})
        return flight.ticketsTotal - tickets.length
    }

    async buyTicket(flightId: number, userId: number) {
        const flight: Flight | null = await Flight.findByPk(flightId);
        if (!flight) {
            throw new Error("Invalid flightId")
        }
        
        if (await this.remainingTicketCount(flightId) == 0) {
            throw new Error("No tickets available")
        }

        const ticketData: any = {
            flightId: flightId,
            userId: userId
        }

        return await Ticket.create(ticketData)
    }
}

export default TicketService
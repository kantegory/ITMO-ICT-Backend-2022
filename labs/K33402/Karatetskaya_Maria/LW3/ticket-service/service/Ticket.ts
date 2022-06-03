import Ticket from "../models/Ticket";

import axios from "axios";

class TicketService {
    async getFlight(id: number, token: string) {
        try {
            const url = `http://localhost:3001/flights/${id}`  
            var response = await axios
            .get(url, {
                headers: {
                    "Authorization" : token
                }
            })
            return response.data
        }
        catch (e: any) {
            throw new Error(e.message)
        }
    }

    async remainingTicketCount(flight: any) {
        const tickets: Ticket[] = await Ticket.findAll({ where: {
            flightId: flight.id
        }})
        return flight.ticketsTotal - tickets.length
    }

    async buyTicket(flight: any, userId: number) {
        if (await this.remainingTicketCount(flight) == 0) {
            throw new Error("No tickets available")
        }
        console.log(flight)
        const ticketData: any = {
            flightId: flight.id,
            userId: userId
        }

        return await Ticket.create(ticketData)
    }

    async getUserTickets(userId: number) {
        const tickets = await Ticket.findAll({ where: {
            userId: userId
        }})
        // console.log(tickets)
        // console.log(userId)

        return tickets
    }
}

export default TicketService
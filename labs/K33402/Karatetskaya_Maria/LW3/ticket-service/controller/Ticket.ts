import TicketService from "../service/Ticket"

class TicketController {
    private ticketService: TicketService = new TicketService;

    buy = async (request: any, response: any) => {
        try {
            const userId = request.user.id;
            const flightId = request.params.id;
            const flight = await this.ticketService.getFlight(flightId, request.user.token)
            
            const ticket = await this.ticketService.buyTicket(flight, userId)
            response.send(ticket)
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    getAll = async (request: any, response: any) => {
        response.send(await this.ticketService.getUserTickets(request.user.id))
    }
    
}

export default TicketController
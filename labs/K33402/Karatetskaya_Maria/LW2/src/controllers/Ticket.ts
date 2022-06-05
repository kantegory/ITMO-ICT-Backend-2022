import TicketService from "../services/Ticket"

class TicketController {
    private ticketService: TicketService = new TicketService;

    buy = async (request: any, response: any) => {
        if (!request.user) {
            response.status(401).send({ error: "Unauthenticated" });
            return
        }

        try {
            const userId = request.user.id;
            console.log(request.user)
            const flightId = request.params.id;

            const ticket = await this.ticketService.buyTicket(flightId, userId)
            response.send(ticket)
        }
        catch (error: any) {
            response.status(400).send(error)
        }
    }
    
}

export default TicketController
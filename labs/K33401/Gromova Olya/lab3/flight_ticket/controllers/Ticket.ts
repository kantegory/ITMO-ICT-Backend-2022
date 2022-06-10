import Flight from "../models/Flight";
import Ticket from "../models/Ticket";
import FlightService from "../services/Flight";
import TicketService from "../services/Ticket";

class TicketController {
    private ticketService: TicketService = new TicketService()
    private flightService: FlightService = new FlightService()

    getAll = async (request: any, response: any) => {
        response.send(await this.ticketService.getByUser(request.user.id))
    }

    get = async (request: any, response: any) => {
        try {
            response.send(await this.ticketService.get(request.params.id))
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    buy = async (request: any, response: any) => {
        try {
            const user: number = request.user.id
            const flight: Flight = await this.flightService.getById(request.params.id)

            const ticket: Ticket = await this.ticketService.create(user, flight.id)
            response.send(ticket)
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const ticket: number = request.params.id
            await this.ticketService.delete(ticket)

            response.sendStatus(200)
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
    }
}

export default TicketController
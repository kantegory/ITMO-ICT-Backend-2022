import Ticket from "../models/Ticket";

class TicketService {
    async create(user: number, flight: number): Promise<Ticket> {
        const ticket: Ticket = await Ticket.create({
            user: user,
            flight: flight,
            boughtAt: new Date(),
            status: 'created'
        })

        return ticket
    }
    
    async getByUser(id: number) {
        console.log(id)
        const tickets: Ticket[] = await Ticket.findAll({ where: {
            user: id
        }})

        return tickets
    }

    async get(id: number): Promise<Ticket> {
        const ticket: Ticket | null = await Ticket.findByPk(id)
        if (ticket == null) {
            throw new Error("Invalid identifier")
        }
        return ticket
    }

    async updateStatus(id: number, status: string): Promise<Ticket> {
        await Ticket.update({
            status: status,
        }, {
            where: {
                id: id
            }
        })

        return this.get(id)
    }

    async delete(id: number) {
        const ticket: Ticket = await this.get(id)
        ticket.destroy()
    }
}

export default TicketService
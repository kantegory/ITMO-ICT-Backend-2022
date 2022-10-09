import useCrudController from '../../composables/useCrudController'
import TicketModel from '../../models/tickets/TicketModel'
import TicketService from '../../services/tickets/TicketService'
import { Request, Response } from 'express'
import UserModel from '../../models/users/UserModel'
import useSafeHandler from '../../composables/useSafeHandler'

export default class TicketController extends useCrudController(
    TicketModel,
    TicketService
) {
    async my(request: Request, response: Response) {
        await useSafeHandler(request, response, async () => {
            const modelsList = await this.service.my((request.user as UserModel).id)
            response.send(modelsList)
        })
    }
}

import Booking from "../../models/Airbnb/Booking";
import BookingError from "../../errors/Airbnb/BookingError";
import BookingService from "../../services/Airbnb/Booking";

class BookingController {
    private bookingService = new BookingService
    
    get = async (request: any, response: any) => {
        try {
            const props = await this.bookingService.getByUser(request.user.id)
            response.send(props)
        }
        catch (err) {
            response.status(500).send((err as Error).message)
        }
    }

    getById = async (request: any, response: any) => {
        try {
            response.send(await this.bookingService.getById(request.params.id))
        }
        catch (err) {
            response.sendStatus(404)
        }
    }

    getByProp = async (request: any, response: any) => {
        try {
            response.send(await this.bookingService.getByProperty(request.params.id))
        }
        catch (err) {
            response.sendStatus(404)
        }
    }

    create = async (request: any, response: any) => {
        try {
            let { body } = request
            body.property = request.params.id
            body.user = request.user.id

            response.status(201).send(await this.bookingService.create(request.body))
        }
        catch (err) {
            response.status(400).send((err as Error).message)
        }
    }

    update = async (request: any, response: any) => {
        try {
            await this.bookingService.update(request.body)
            response.sendStatus(204)
        }
        catch (err) {
            response.status(400).send((err as Error).message)
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.bookingService.delete(request.params.id)
            response.sendStatus(204)
        }
        catch (err) {
            response.status(400).send((err as Error).message)
        }
    }

}

export default BookingController
import Flight from "../models/Flight";
import FlightService from "../services/Flight";

class FlightController {
    private flightService: FlightService = new FlightService()

    get = async (request: any, response: any) => {
        try {
            const { departure, arrival } = request.body
            const flights: Flight[] = await this.flightService.filterGet(departure, arrival)
            response.send(flights)
        }
        catch (error: any) {
            response.status(500).send(error.message)
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const flight = await this.flightService.getById(request.params.id)
            response.send(flight)
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request
            const flight: Flight = await this.flightService.create(body)

            response.send(flight)
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    update = async (request: any, response: any) => {
        try {
            const { body } = request
            const flight: Flight = await this.flightService.update(body)

            response.send(flight)
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.flightService.delete(request.params.id)
            response.sendStatus(200)
        }
        catch (error: any) {
            response.sendStatus(400)
        }
    }
}

export default FlightController
import FlightService from "../services/Flight"
import Flight from "../models/Flight";

class FlightController {
    private flightService: FlightService = new FlightService();

    get = async (request: any, response: any) => {
        const id = request.params.id
        try {
            const flight: Flight = await this.flightService.get(id)
            response.send(flight)
        }
        catch (error: any) {
            response.status(404)
        }        
    }

    filter = async (request: any, response: any) => {
        const body = request.body
        try {
            const flights: Flight[] = await this.flightService.filter(body)
            response.send(flights)
        }
        catch (error: any) {
            response.status(400)
        }
    }

    create = async (request: any, response: any) => {
        try {
            const flight: Flight = await this.flightService.create(request.body)
            response.send(flight)
        }
        catch (error: any) {
            response.status(400).send()
        }
    }
}

export default FlightController
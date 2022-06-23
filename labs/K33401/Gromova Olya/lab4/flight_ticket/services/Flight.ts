import Flight from "../models/Flight";
import { Op } from "sequelize"

class FlightService {
    async create(flightData: any) {
        return Flight.create(flightData)
    }

    async getAll() {
        return Flight.findAll()
    }

    private async getWhere(whereBlock: any) {
        return Flight.findAll({ where: whereBlock })
    }

    async filterGet(departure?: string, arrival?: string) {
        // if (!departure && !arrival) {
        //     return this.getAll()
        // }

        let whereBlock: any = {}
        if (departure) {
            whereBlock['departureCity'] = departure as string
        }

        if (arrival) {
            whereBlock['arrivalCity'] = arrival as string
        }

        return this.getWhere(whereBlock)
    }

    async getById(id: number) {
        const flight: Flight | null = await Flight.findByPk(id)
        if (flight == null) {
            throw new Error("Invalid identifier")
        }

        return flight
    }

    async getByDepartureCity(departure: string) {
        return Flight.findAll({ where: {
            departureCity: departure
        }})
    }
    
    async getByArrivalCity(arrival: string) {
        return Flight.findAll({ where: {
            arrivalCity: arrival
        }})
    }

    async getByArrivalDate(arrival: Date) {
        return Flight.findAll({ where: {
            arrivalDate: {
                [Op.gte]: arrival.getDate(),
                [Op.lt]: arrival.getDate() + 1,
            }
        }})
    }

    async getByDepartureDate(departure: Date) {
        return Flight.findAll({ where: {
            arrivalDate: {
                [Op.gte]: departure.getDate(),
                [Op.lt]: departure.getDate() + 1,
            }
        }})
    }

    async update(newFlightData: any) {
        await Flight.update(newFlightData, {
            where: {
                id: newFlightData.id
            }
        })
        console.log(newFlightData.id)
        return this.getById(newFlightData.id)
    }

    async delete(id: number) {
        const flight: Flight = await this.getById(id)
        flight.destroy()
    }
}

export default FlightService
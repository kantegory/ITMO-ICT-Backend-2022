import Flight from "../models/Flight"
import { Sequelize, Op } from "sequelize";

class FlightService {

    async get(id: number) {
        const flight: Flight | null = await Flight.findByPk(id);
        if (flight == null) {
            throw new Error
        }
        return flight;
    }

    async filter(fo: any) {
        let where: any = {}

        if (fo.departureTimeFrom || fo.departureTimeTo) {
            let departureTime: any;

            if (fo.departureTimeFrom && fo.departureTimeTo) {
                departureTime = {
                    [Op.gte]: fo.departureTimeFrom,
                    [Op.lte]: fo.departureTimeTo
                 }
            }
            else if (fo.departureTimeFrom) {
                departureTime = { [Op.gte]: fo.departureTimeFrom }
            }
            else if (fo.departureTimeTo) {
                departureTime = { [Op.lte]: fo.departureTimeTo }
            }
            where.departure = departureTime
        }
        if (fo.arrivalTimeFrom || fo.arrivalTimeTo) {
            let arrivalTime: any;

            if (fo.arrivalTimeFrom && fo.arrivalTimeTo) {
                arrivalTime = {
                    [Op.gte]: fo.arrivalTimeFrom,
                    [Op.lte]: fo.arrivalTimeTo
                 }
            }
            else if (fo.arrivalTimeFrom) {
                arrivalTime = { [Op.gte]: fo.arrivalTimeFrom }
            }
            else if (fo.arrivalTimeTo) {
                arrivalTime = { [Op.lte]: fo.arrivalTimeTo }
            }
            where.arrival = arrivalTime
        }

        if (fo.arrivalTimeFrom || fo.arrivalTimeTo) {
            let arrivalTime: any = {}
            if (fo.arrivalTimeFrom) {
                arrivalTime.gte = fo.arrivalTimeFrom
            }
            if (fo.arrivalTimeTo) {
                arrivalTime.lte = fo.arrivalTimeTo
            }

            where.arrival = arrivalTime
        }

        if (fo.departureFrom) {
            where.departureFrom = fo.departureFrom
        }
        if (fo.arrivalTo) {
            where.arrivalTo = fo.arrivalTo
        }
        
        console.log(where)
        const flights: Flight[] = await Flight.findAll({ where: where })
        return flights
    }
    
    async create(flightData: any) {
        try {
            // if (!flightData.ticketsRemaining) {
            //     flightData.ticketsRemaining = flightData.ticketsTotal
            // }
            return await Flight.create(flightData)
        }
        catch (error: any) {
            throw new Error
        }
    }
}

export default FlightService
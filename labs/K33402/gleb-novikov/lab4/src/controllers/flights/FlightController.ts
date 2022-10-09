import useCrudController from '../../composables/useCrudController'
import FlightModel from '../../models/flights/FlightModel'
import FlightService from '../../services/flights/FlightService'
import { Request, Response } from 'express'
import SeatModel from '../../models/seats/SeatModel'
import { Op } from 'sequelize'
import useQueryFilters from '../../composables/useQueryFilters'

export default class FlightController extends useCrudController(
    FlightModel,
    FlightService
) {
    async list(request: Request, response: Response) {
        const options = useQueryFilters(request, {
            include: [SeatModel],
            where: [
                { qKey: 'flight', prop: 'flightNumber', cmp: Op.like },
                { qKey: 'departure', prop: 'departureAirport', cmp: Op.like },
                { qKey: 'arrival', prop: 'arrivalAirport', cmp: Op.like },
                { qKey: 'aircraft', prop: 'aircraft', cmp: Op.like },
                { qKey: 'departureTimeFrom', prop: 'departureTime', cmp: Op.gte },
                { qKey: 'departureTimeTo', prop: 'departureTime', cmp: Op.lte },
                { qKey: 'arrivalTimeFrom', prop: 'arrivalTime', cmp: Op.gte },
                { qKey: 'arrivalTimeTo', prop: 'arrivalTime', cmp: Op.lte },
                {
                    qKey: 'priceFrom',
                    model: SeatModel,
                    prop: 'price',
                    cmp: Op.gte,
                },
                {
                    qKey: 'priceTo',
                    model: SeatModel,
                    prop: 'price',
                    cmp: Op.lte,
                },
            ],
        })

        return super.list(request, response, options)
    }
}

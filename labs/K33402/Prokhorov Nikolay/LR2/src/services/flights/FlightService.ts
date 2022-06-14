import useCrudService from '../../composables/useCrudService'
import FlightModel from '../../models/flights/FlightModel'
import SeatModel from '../../models/seats/SeatModel'
import { FindOptions } from 'sequelize/types/model'

export default class FlightService extends useCrudService(FlightModel) {
    async list(options?: FindOptions<any>) {
        if (!options) options = {}
        options.include = SeatModel
        return super.list(options)
    }

    async item(pk: number, options?: FindOptions<any>) {
        if (!options) options = {}
        options.include = SeatModel
        return super.item(pk, options)
    }
}

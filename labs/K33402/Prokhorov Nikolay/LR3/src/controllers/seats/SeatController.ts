import useCrudController from '../../composables/useCrudController'
import SeatModel from '../../models/seats/SeatModel'
import SeatService from '../../services/seats/SeatService'

export default class SeatController extends useCrudController(
    SeatModel,
    SeatService
) {}

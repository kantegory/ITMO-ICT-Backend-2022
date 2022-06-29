import useCrudService from '../../composables/useCrudService'
import SeatModel from '../../models/seats/SeatModel'

export default class SeatService extends useCrudService(SeatModel) {}

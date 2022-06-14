import useCrudController from '../../composables/useCrudController'
import FlightModel from '../../models/flights/FlightModel'
import FlightService from '../../services/flights/FlightService'

export default class FlightController extends useCrudController(FlightModel, FlightService) {

}
import useCrudRouter from '../../../composables/useCrudRouter'
import FlightController from '../../../controllers/flights/FlightController'

const { router: flightRouter } = useCrudRouter(FlightController)

export default flightRouter

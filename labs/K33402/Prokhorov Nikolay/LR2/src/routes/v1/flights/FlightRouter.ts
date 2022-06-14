import useCrudRouter from '../../../composables/useCrudRouter'
import FlightController from '../../../controllers/flights/FlightController'

const flightRouter = useCrudRouter(FlightController)

export default flightRouter
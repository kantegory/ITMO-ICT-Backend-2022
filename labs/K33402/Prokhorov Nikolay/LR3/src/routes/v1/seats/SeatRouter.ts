import useCrudRouter from '../../../composables/useCrudRouter'
import SeatController from '../../../controllers/seats/SeatController'

const { router: seatRouter } = useCrudRouter(SeatController)

export default seatRouter

import express from 'express'
import HotelController from '../../../controllers/hotels/Hotel'
import { isAdmin, isAuthenticated } from '../../../utils/auth'

const hotelRoutes = express.Router()

const hotelController = new HotelController()

hotelRoutes.route('/').get(hotelController.list)
hotelRoutes.route('/').post(isAuthenticated, isAdmin, hotelController.create)

hotelRoutes.route('/:id').get(hotelController.retrieve)
hotelRoutes.route('/:id').patch(isAuthenticated, isAdmin, hotelController.update)
hotelRoutes.route('/:id').delete(isAuthenticated, isAdmin, hotelController.destroy)

export default hotelRoutes

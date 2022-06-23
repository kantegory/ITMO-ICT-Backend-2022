import express from 'express'
import { isAdmin, isAuthenticated } from '../../../utils/auth'
import RoomController from '../../../controllers/hotels/Room'

const roomRoutes = express.Router()

const roomController = new RoomController()

roomRoutes.route('/').post(isAuthenticated, isAdmin, roomController.create)
roomRoutes.route('/:id').get(roomController.retrieve)
roomRoutes.route('/:id').patch(isAuthenticated, isAdmin, roomController.update)
roomRoutes.route('/:id').delete(isAuthenticated, isAdmin, roomController.destroy)

export default roomRoutes

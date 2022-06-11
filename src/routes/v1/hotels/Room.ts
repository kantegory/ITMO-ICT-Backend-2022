import express from 'express'
import { isAdmin, isAuthenticated } from '../../../utils/auth'
import RoomController from '../../../controllers/hotels/Room'

const roomRoutes = express.Router()

const roomController = new RoomController()

roomRoutes.route('/').post(isAuthenticated, isAdmin, roomController.create)
roomRoutes.route('/:id(\\d+)').patch(isAuthenticated, isAdmin, roomController.update)
roomRoutes.route('/:id(\\d+)').delete(isAuthenticated, isAdmin, roomController.destroy)

export default roomRoutes

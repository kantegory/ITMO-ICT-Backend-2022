import express from 'express'
import RoomController from '../../../controllers/rooms/Room'

const router: express.Router = express.Router()

const controller: RoomController = new RoomController()

router.route('/').post(controller.create)
router.route('/:id').get(controller.list)

export default router

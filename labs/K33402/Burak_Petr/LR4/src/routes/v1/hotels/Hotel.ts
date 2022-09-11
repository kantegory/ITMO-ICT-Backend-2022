import express from 'express'
import HotelController from '../../../controllers/hotels/Hotel'

const router: express.Router = express.Router()

const controller: HotelController = new HotelController()

router.route('/').get(controller.list)
router.route('/').post(controller.create)

router.route('/:id').get(controller.item)



export default router

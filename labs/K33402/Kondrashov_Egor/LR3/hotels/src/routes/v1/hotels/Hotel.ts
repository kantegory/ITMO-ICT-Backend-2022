
import { Router } from 'express';
import HotelController from "../../../controllers/hotels/Hotel";

const router = Router();

const controller = new HotelController()

router.route('')
    .get(controller.list)

router.route('/:id')
    .get(controller.retrieve)

export default router

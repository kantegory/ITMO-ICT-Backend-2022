import HotelController from "../../controllers/hotels/hotel";
import { Router } from 'express';

const router = Router();
const controller = new HotelController()

router.post(
    '/create',
    controller.create
)

router.get(
    '/hotel/:Name',
    controller.getbyname
)

router.get(
    '/listhotel',
   controller.getall
)
router.put(
    '/update/:id',
    controller.update
)

router.delete(
    '/delete/:id',
    controller.delete
)

export default router
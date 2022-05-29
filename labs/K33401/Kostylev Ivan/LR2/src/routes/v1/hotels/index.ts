import express from "express";
import HotelController from "../../../controllers/hotels/index";

const router: express.Router = express.Router()

const controller = new HotelController()

router.route('/new/')
    .post(controller.createHotel)

router.route('/')
    .get(controller.getAll)

router.route('/:id')
    .get(controller.getById)

router.route('/town/:town')
    .get(controller.getByTown)

router.route('/:id')
    .delete(controller.deleteHotelById)

export default router
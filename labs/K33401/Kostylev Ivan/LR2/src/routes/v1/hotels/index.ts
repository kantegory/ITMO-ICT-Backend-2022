import express from "express";
import HotelController from "../../../controllers/hotels";

const router: express.Router = express.Router()

const controller = new HotelController()

router.route('/new')
    .post(controller.createHotel)

router.route('/all')
    .get(controller.getAll)

router.route('/id/:id')
    .get(controller.getById)

router.route('/town/:town')
    .get(controller.getByTown)

router.route('/id/:id')
    .delete(controller.deleteHotelById)

export default router
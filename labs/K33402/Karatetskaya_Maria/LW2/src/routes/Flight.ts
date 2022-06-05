import express from 'express';
import FlightController from '../controllers/Flight';

const router: express.Router = express.Router()
const controller: FlightController = new FlightController()

router.route("/flights/:id").get(controller.get)
router.route("/flights").get(controller.filter)
router.route("/flights").post(controller.create)

export default router
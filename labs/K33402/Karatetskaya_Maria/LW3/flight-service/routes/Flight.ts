import express from 'express';
import FlightController from '../controller/Flight';

import auth from '../middleware/Auth';

const router: express.Router = express.Router()
const controller: FlightController = new FlightController()

router.route("/flights/:id").get(auth, controller.get)
router.route("/flights").get(auth, controller.filter)
router.route("/flights").post(auth, controller.create)

export default router
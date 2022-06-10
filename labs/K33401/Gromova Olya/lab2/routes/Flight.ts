import FlightController from "../controllers/Flight";
import authMiddleware from "../middleware/authenticate"

import express from "express"

const router = express.Router()
const controller = new FlightController()

router.route('/flights').get(authMiddleware.authenticate, controller.get)
router.route('/flights/:id').get(authMiddleware.authenticate, controller.getById)
router.route('/flights').post(authMiddleware.authenticate, controller.create)
router.route('/flights').put(authMiddleware.authenticate, controller.update)
router.route('/flights/:id').delete(authMiddleware.authenticate, controller.delete)

export default router
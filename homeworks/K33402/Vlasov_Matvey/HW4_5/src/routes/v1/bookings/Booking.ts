
import express from "express"
import BookingController from "../../../controllers/bookings/Booking"

const router: express.Router = express.Router()

const controller: BookingController = new BookingController()

router.route("/create").post(controller.create)

router.route("/get/:id").get(controller.retrieve)

router.route("/update/:id").post(controller.update)

router.route("/delete/:id").post(controller.delete)

router.route("/list").get(controller.getList)

export default router
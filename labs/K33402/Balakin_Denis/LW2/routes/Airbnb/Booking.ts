import express from "express";
import BookingController from "../../controllers/Airbnb/Booking";

const bookingRouter = express.Router()

const bookingController = new BookingController

bookingRouter.route('/booking').get(bookingController.get)
bookingRouter.route('/property/:id/booking').post(bookingController.create)
bookingRouter.route('/property/:id/booking').get(bookingController.getByProp)
bookingRouter.route('/booking/:id').get(bookingController.getById)
bookingRouter.route('/booking').put(bookingController.update)
bookingRouter.route('/booking/:id').delete(bookingController.delete)

export default bookingRouter
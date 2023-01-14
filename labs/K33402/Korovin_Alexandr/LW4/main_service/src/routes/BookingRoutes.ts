import express from "express";
import controller from "../controllers/BookingController";
import { Schemas, ValidateJoi } from "../middleware/ValidateSchema";

const router = express.Router();

router.post("/create", ValidateJoi(Schemas.booking.create),controller.createBooking);
router.get("/get/:bookingId", controller.getBooking);
router.get("/get", controller.getBookingList);
router.patch("/update/:bookingId", ValidateJoi(Schemas.booking.create),controller.updateBooking);
router.delete("/delete/:bookingId", controller.deleteBooking);

export = router;

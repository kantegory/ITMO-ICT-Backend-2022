import express from "express";
import BookingRoutes from "./bookings/BookingRoutes";

const router: express.Router = express.Router();

router.use('/bookings', BookingRoutes);

export default router;

import express from "express";
import flightRouter from "./flights/FlightRouter";
import seatRouter from "./seats/SeatRouter";

const router: express.Router = express.Router()

router.use('/flights', flightRouter)
router.use('/seats', seatRouter)

export default router

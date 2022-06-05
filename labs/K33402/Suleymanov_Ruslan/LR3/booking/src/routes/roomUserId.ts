import { Router } from "express";
import RoomUserIdController from "../controllers/RoomUserIdController";

const router = Router();

// Get one user
router.post(
    "/delete",
    RoomUserIdController.deleteBooking
);

//Create a new booking
router.post("/create",
    RoomUserIdController.createBooking);


export default router;
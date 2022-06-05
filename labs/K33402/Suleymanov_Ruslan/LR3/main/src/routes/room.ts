import { Router } from "express";
import RoomController from "../controllers/RoomController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all room
router.get("/", [checkJwt], RoomController.allRoom);

// Get one user
router.get(
    "/:id([0-9]+)",
    [checkJwt],
    RoomController.getOneRoom
);

//Create a new room
router.post("/", [checkJwt, checkRole(["ADMIN"])], RoomController.newRoom);

//Edit one room
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    RoomController.editRoom
);

//Delete one room
router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    RoomController.deleteRoom
);


export default router;
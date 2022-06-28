import express from "express";
import RoomController from "../../controllers/hotels/RoomController";

const router: express.Router = express.Router();

const controller: RoomController = new RoomController();

router.route('/')
    .get(controller.list);

router.route('/:id')
    .get(controller.get);

export default router;

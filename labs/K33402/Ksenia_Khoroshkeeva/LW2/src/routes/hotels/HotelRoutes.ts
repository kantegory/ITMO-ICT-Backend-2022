import express from "express";
import HotelController from "../../controllers/hotels/HotelController";
import passport from "../../middlewares/passport";

const router: express.Router = express.Router();

const controller: HotelController = new HotelController();

router.route('/')
    .get(controller.list);

router.route('/:id')
    .get(controller.get);

export default router;

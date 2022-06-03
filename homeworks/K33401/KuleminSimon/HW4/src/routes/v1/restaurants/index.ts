import express from "express";
import RestaurantController from "../../../controllers/restaurants";
import passport from "../../../middlewares/password";

const router: express.Router = express.Router()

const controller: RestaurantController = new RestaurantController()

router.route('/add')
    .post(passport.authenticate('jwt', { session: false }), controller.post)

router.route('/restaurants')
    .get(passport.authenticate('jwt', { session: false }), controller.getAll)

export default router
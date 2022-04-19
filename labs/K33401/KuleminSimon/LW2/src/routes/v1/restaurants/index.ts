import express from "express";
import RestaurantController from "../../../controllers/restaurants";
import passport from "../../../middlewares/password";

const router: express.Router = express.Router()

const controller: RestaurantController = new RestaurantController()

router.route('/add')
    .post(passport.authenticate('jwt', { session: false }), controller.post)

router.route('/restaurants')
    .get(passport.authenticate('jwt', { session: false }), controller.getAll)

router.route('/id/:id')
    .get(passport.authenticate('jwt', { session: false }), controller.getById)

router.route('/name/:name')
    .get(passport.authenticate('jwt', { session: false }), controller.getByName)

router.route('/ratingHigher/:rating')
    .get(passport.authenticate('jwt', { session: false }), controller.ratingHigher)

export default router
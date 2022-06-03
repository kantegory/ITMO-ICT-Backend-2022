import express from "express";
import RestaurantController from "../../../controllers/restaurants";

const router: express.Router = express.Router()

const controller: RestaurantController = new RestaurantController()

router.route('/add')
    .post(controller.post)

router.route('/restaurants')
    .get( controller.getAll)

router.route('/id/:id')
    .get(controller.getById)

router.route('/name/:name')
    .get(controller.getByName)

router.route('/ratingHigher/:rating')
    .get(controller.ratingHigher)

export default router
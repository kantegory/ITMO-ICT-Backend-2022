import express from "express"
import UserController from "../controllers/user/index"
import HotelController from "../controllers/hotel"

const router: express.Router = express.Router()

const userController = new UserController()
const hotelController = new HotelController()

router
    .route('/user')
    .get(userController.get)
    .post(userController.post)


router
    .route('/hotel')
    .get(hotelController.get)
    .post(hotelController.post)

export default router
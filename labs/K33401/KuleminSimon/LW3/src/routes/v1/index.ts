import express from "express"
import restaurantRoutes from "./restaurants/index"

const router: express.Router = express.Router()

router.use('/restaurant', restaurantRoutes)

export default router
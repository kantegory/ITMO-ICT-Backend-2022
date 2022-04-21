import express from "express"
import userRoutes from "./users/User"
import propertyRoutes from "./property/Property"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/property', propertyRoutes)

export default router
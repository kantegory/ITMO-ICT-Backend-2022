import express from "express"
import hotelRouter from "./hotels/index"

const router: express.Router = express.Router()

router.use('/hotels', hotelRouter)

export default router
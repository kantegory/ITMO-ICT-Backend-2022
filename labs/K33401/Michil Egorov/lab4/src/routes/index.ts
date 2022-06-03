import express from "express"
import stockRoutes from "./stocks"


const router = express.Router()

router.use("/api/stocks", stockRoutes)

export default router
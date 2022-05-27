import express from "express"
import userRoutes from "./users"
import stockRoutes from "./stocks"
import portfolioRoutes from "./portfolios"
import authRoutes from "./auth"


const router = express.Router()

router.use("/users", userRoutes)
router.use("/stocks", stockRoutes)
router.use("/portfolios", portfolioRoutes)
router.use("/auth", authRoutes)


export default router
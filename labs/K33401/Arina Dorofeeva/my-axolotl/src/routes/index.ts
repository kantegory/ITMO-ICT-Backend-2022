import express from "express"
import userRoutes from "./user"
import postRoutes from "./post"

const router = express.Router()

router.use("/user", userRoutes)
router.use("/post", postRoutes)

export default router

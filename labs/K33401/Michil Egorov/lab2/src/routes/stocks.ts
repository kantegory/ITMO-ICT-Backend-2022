import express from "express"
import StockController from "../controllers/StockController"

const router = express.Router()

const controller = new StockController()

router.route("/:id")
  .get(controller.get)

export default router

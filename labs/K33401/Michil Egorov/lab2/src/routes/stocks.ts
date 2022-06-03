import express from "express"
import StockController from "../controllers/StockController"

const router = express.Router()

const controller = new StockController()

router.route("/:id")
  .get(controller.get)

router.route("/")
  .get(controller.list)

router.route("/history/:id")
  .get(controller.getStockHistory)

router.route("/update_price")
  .post(controller.updatePrice)

router.route("/")
  .post(controller.create)

router.route("/:id")
  .delete(controller.delete)


export default router

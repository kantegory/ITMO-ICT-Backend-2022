import express from "express"
import PortfolioController from "../controllers/PortfolioController"

const router = express.Router()

const controller = new PortfolioController()

router.route("/:id")
  .get(controller.get)

router.route("/")
  .get(controller.list)

router.route("/buy")
  .post(controller.buy)

router.route("/sell")
  .post(controller.sell)

router.route("/")
  .delete(controller.delete)

router.route("/:id")
  .post(controller.update)

export default router

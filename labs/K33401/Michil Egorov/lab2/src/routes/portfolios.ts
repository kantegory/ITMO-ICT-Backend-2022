import express from "express"
import PortfolioController from "../controllers/PortfolioController"

const router = express.Router()

const controller = new PortfolioController()

router.route("/:id")
  .get(controller.get)

export default router

import express from "express"
import PostController from "../controllers/PostController"

const router = express.Router()

const controller = new PostController()

router.route("/:id")
  .get(controller.get)

router.route("/")
  .get(controller.get)

router.route("/")
  .post(controller.post)

router.route("/favorites")
  .post(controller.addFavorite)

export default router

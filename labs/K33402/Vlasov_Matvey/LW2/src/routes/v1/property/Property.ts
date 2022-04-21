
import express from "express"
import PropertyController from "../../../controllers/property/Property"

const router: express.Router = express.Router()

const controller: PropertyController = new PropertyController()

router.route("/create").post(controller.create)

router.route("/get/:id").get(controller.retrieve)

router.route("/update/:id").post(controller.update)

router.route("/delete/:id").post(controller.delete)

router.route("/list").get(controller.getList)

export default router
import express from "express"
import ExampleController from "../../controllers/example/index"

const router: express.Router = express.Router()

const exampleController = new ExampleController()

router
    .route('/')
    .get(exampleController.get)

export default router
import express from "express"
import ExampleController from '../../controllers/users/index'

const router: express.Router = express.Router()

const exampleController = new ExampleController()

router.get(
    '/gioithieu',
    exampleController.gioithieu
)

router.post(
    '/create',
    exampleController.create
)

router.get(
    '/getdata/:id',
    exampleController.get
)

router.get(
    '/getdata',
    exampleController.getall
)

router.put(
    '/update/:id',
    exampleController.update
)

router.delete(
    '/delete/:id',
    exampleController.delete
)
export default router
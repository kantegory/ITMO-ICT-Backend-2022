import express from "express"
import MeController from '../../controllers/users/index'

const router: express.Router = express.Router()

const meController = new MeController()

router.get(
    '/gioithieu',
    meController.gioithieu
)

router.post(
    '/create',
    meController.create
)

router.get(
    '/getdata/:id',
    meController.get
)

router.get(
    '/getdata',
    meController.getall
)

router.put(
    '/update/:id',
    meController.update
)

router.delete(
    '/delete/:id',
    meController.delete
)
export default router
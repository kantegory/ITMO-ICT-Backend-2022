import express, { Request, Response } from "express"
import UserController from '../../controllers/users/user'

const router: express.Router = express.Router()

const userController = new UserController()

// router
//     .route('/')
//     .get((req: Request, res: Response) => {
//         return res.send('U')
//     })
router.post(
    '/create', 
    userController.post
)

router.get(
    '/user/:id',
    userController.get
)

router.get(
    '/user',
    userController.me
)

router.put(
    '/user/:id',
    userController.update
)

router.get(
    '/user/delete/:id',
    userController.delete
)

export default router
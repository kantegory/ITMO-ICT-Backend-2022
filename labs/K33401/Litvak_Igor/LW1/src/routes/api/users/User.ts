import express from 'express'
import UserController from '../../../controllers/users/User'
import passport from '../../../middlewares/passport'

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/')
    .post(controller.post)

router.route('/me')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

router.route('/:id')
    .get(controller.get)

export default router

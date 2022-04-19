import express from "express";
import UserController from "../../../controllers/users/index";
import passport from "../../../middlewares/password";

const router: express.Router = express.Router()

const controller: UserController = new UserController()

//получается регистрация
router.route('/add')
    .post(controller.post)

//похоже на вход
router.route('/login')
    .post(controller.login)

//хто я?
router.route('/me')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

router.route('/profiles')
    .get(passport.authenticate('jwt', { session: false }), controller.getAll)

router.route('/id/:id')
    .get(passport.authenticate('jwt', { session: false }), controller.getById)

router.route('/username/:username')
    .get(passport.authenticate('jwt', { session: false }), controller.getByUsername)

export default router
import express from "express";
import ProxyBookingController from "../../controllers/bookings/ProxyBookingController";
import passport from "../../middlewares/passport";

const router: express.Router = express.Router();

const controller: ProxyBookingController = new ProxyBookingController();

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), controller.list);

router.route('/:id')
    .get(passport.authenticate('jwt', { session: false }), controller.get);

router.route('/')
    .post(passport.authenticate('jwt', { session: false }), controller.create);

export default router;

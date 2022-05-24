import BookingController from '../../controllers/booking'
import express from "express"
import passport from "passport"
import { Router } from 'express'


const router = Router()
const bookingcontroller = new BookingController()

router.route('/list').get(passport.authenticate('jwt', {session: false}), bookingcontroller.get)
router.route('/create').post(passport.authenticate('jwt', {session: false}), bookingcontroller.post)

export default router
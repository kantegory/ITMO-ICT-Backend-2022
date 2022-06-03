import HotelController from '../../controllers/hotel'
import express from "express"
import { Router } from 'express'


const router = Router()
const hotelcontroller = new HotelController()

router.route('/list').get(hotelcontroller.get)
router.route('/create').post(hotelcontroller.post)

export default router
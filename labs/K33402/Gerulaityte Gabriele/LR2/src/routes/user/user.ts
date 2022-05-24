import express from "express"
import Controller from '../../controllers/user'
import { Router } from 'express'
import passport from "../../middlewares/passport"


const router: express.Router = express.Router()

const usercontroller = new Controller()

router.get('/:firstName', 
  passport.authenticate('jwt', {session: false}), usercontroller.me)

router.route('/read')
  .get(usercontroller.get)

router.route('/create')
  .post(usercontroller.post)

router.route('/user/:id')
  .get(usercontroller.getbyID)

router.route('/update/:id')
  .put(usercontroller.put)

router.route('/delete/:id')
  .delete(usercontroller.delete)
  
export default router
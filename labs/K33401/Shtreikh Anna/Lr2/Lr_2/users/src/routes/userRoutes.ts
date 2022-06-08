
import express from "express"
import UserController from "../controllers/users/userController"

const router = express.Router()
const passport = require('passport')
const userController = new UserController()

router
  .route('/users')
  .get(userController.get)

router
  .route('/users/id/:id')
  .get(userController.getbyID)

router
  .route('/users/email/:email')
  .get(userController.getbyEmail)

router
  .route('/users/:id')
  .put(userController.put)

router
  .route('/users')
  .post(userController.post)

router
  .route('/users/:id')
  .delete(userController.delete)

router
  .route('/users/auth')
  .post(userController.registration)

router
  .route('/users/log')
  .post(userController.loggingIn)

router
  .route('/users/logout')
  .get(userController.loggingOut)

router
  .route('/users/profile')
  .get(userController.showProfile)
export default router


import express from "express";
import PropertyController from "../../controllers/Airbnb/Property";

const propertyRouter = express.Router()

const propertyController = new PropertyController

propertyRouter.route('/property').get(propertyController.get)
propertyRouter.route('/property/:id').get(propertyController.getById)
propertyRouter.route('/property').post(propertyController.create)
propertyRouter.route('/property').put(propertyController.update)
propertyRouter.route('/property/:id').delete(propertyController.delete)

export default propertyRouter
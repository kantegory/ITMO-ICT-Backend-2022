import express from "express";
import RoomController from "../../../controllers/rooms/index";

const router: express.Router = express.Router()

const controller = new RoomController()

router.route('/new/')
    .post(controller.createRoom)

router.route('/')
    .get(controller.getAll)

router.route('/:id')
    .get(controller.getById)

router.route('/town/:town')
    .get(controller.getByTown)

router.route('/capacity/:capacity')
    .get(controller.getByCapacity)

export default router
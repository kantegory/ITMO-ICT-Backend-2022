import express from 'express'
import { ModelCrudControllerAbstract } from './useCrudController'
import { isLogged } from '../utils/permissions'

export default function useCrudRouter<
    C extends ModelCrudControllerAbstract
>(ControllerClass: { new (): C }) {
    const router = express.Router()
    const controller = new ControllerClass()

    router.route('/').get(controller.list.bind(controller))
    router.route('/').post(isLogged, controller.create.bind(controller))
    router.route('/:id').get(controller.item.bind(controller))
    router.route('/:id').patch(isLogged, controller.update.bind(controller))
    router.route('/:id').delete(isLogged, controller.delete.bind(controller))

    return router
}

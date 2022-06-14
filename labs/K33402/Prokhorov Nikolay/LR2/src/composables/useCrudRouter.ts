import express from 'express'
import { ModelCrudControllerAbstract } from './useCrudController'
import { isLogged } from '../utils/permissions'

export default function useCrudRouter<
    C extends ModelCrudControllerAbstract
>(ControllerClass: { new (): C }) {
    const router = express.Router()
    const controller = new ControllerClass()

    router.route('/').get(controller.list)
    router.route('/').post(isLogged, controller.create)
    router.route('/:id').get(controller.item)
    router.route('/:id').patch(isLogged, controller.update)
    router.route('/:id').delete(isLogged, controller.delete)

    return router
}

import { ModelStatic } from 'sequelize/types/model'
import express from 'express'
import useSafeHandler from './useSafeHandler'
import UserModel from '../models/users/UserModel'
import { ModelCrudServiceBase } from './useCrudService'

export abstract class ModelCrudControllerAbstract {
    abstract list(
        request: express.Request,
        response: express.Response
    ): Promise<any>
    abstract item(
        request: express.Request,
        response: express.Response
    ): Promise<any>
    abstract create(
        request: express.Request,
        response: express.Response
    ): Promise<any>
    abstract update(
        request: express.Request,
        response: express.Response
    ): Promise<any>
    abstract delete(
        request: express.Request,
        response: express.Response
    ): Promise<any>
}

export default function useCrudController<
    M extends ModelStatic<any>,
    S extends ModelCrudServiceBase<any>
>(model: M, ServiceClass: { new (): S }) {
    return class ModelCrudController {
        private service: S

        constructor() {
            this.service = new ServiceClass()
        }

        list = async (request: express.Request, response: express.Response) =>
            useSafeHandler(request, response, async () => {
                const modelsList = await this.service.list()
                response.send(modelsList)
            })

        item = async (request: express.Request, response: express.Response) =>
            useSafeHandler(request, response, async () => {
                const modelItem = await this.service.item(
                    Number(request.params.id)
                )
                response.send(modelItem)
            })

        create = async (request: express.Request, response: express.Response) =>
            useSafeHandler(request, response, async () => {
                const modelItem = await this.service.create(
                    request.body,
                    (request.user as UserModel).id
                )
                response.send(modelItem)
            })

        update = async (request: express.Request, response: express.Response) =>
            useSafeHandler(request, response, async () => {
                const modelItem = await this.service.update(
                    Number(request.params.id),
                    request.body,
                    (request.user as UserModel).id
                )
                response.send(modelItem)
            })

        delete = async (request: express.Request, response: express.Response) =>
            useSafeHandler(request, response, async () => {
                await this.service.delete(
                    Number(request.params.id),
                    (request.user as UserModel).id
                )
                response.status(204).send()
            })
    }
}

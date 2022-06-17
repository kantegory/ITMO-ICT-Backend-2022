import { FindOptions, ModelStatic } from 'sequelize/types/model'
import { Request, Response } from 'express'
import useSafeHandler from './useSafeHandler'
import UserModel from '../models/users/UserModel'
import { ModelCrudServiceBase } from './useCrudService'

export abstract class ModelCrudControllerAbstract {
    abstract list(request: Request, response: Response): Promise<any>
    abstract item(request: Request, response: Response): Promise<any>
    abstract create(request: Request, response: Response): Promise<any>
    abstract update(request: Request, response: Response): Promise<any>
    abstract delete(request: Request, response: Response): Promise<any>
}

export default function useCrudController<
    M extends ModelStatic<any>,
    S extends ModelCrudServiceBase<any>
>(model: M, ServiceClass: { new (): S }) {
    return class ModelCrudController {
        service: S

        constructor() {
            this.service = new ServiceClass()
        }

        async list(
            request: Request,
            response: Response,
            serviceOptions?: FindOptions<any>
        ) {
            await useSafeHandler(request, response, async () => {
                const modelsList = await this.service.list(serviceOptions)
                response.send(modelsList)
            })
        }

        async item(
            request: Request,
            response: Response,
            serviceOptions?: FindOptions<any>
        ) {
            await useSafeHandler(request, response, async () => {
                const modelItem = await this.service.item(
                    Number(request.params.id),
                    serviceOptions
                )
                response.send(modelItem)
            })
        }

        async create(request: Request, response: Response) {
            await useSafeHandler(request, response, async () => {
                const modelItem = await this.service.create(
                    request.body,
                    (request.user as UserModel).id
                )
                response.status(201).send(modelItem)
            })
        }

        async update(request: Request, response: Response) {
            await useSafeHandler(request, response, async () => {
                const modelItem = await this.service.update(
                    Number(request.params.id),
                    request.body,
                    (request.user as UserModel).id
                )
                response.send(modelItem)
            })
        }

        async delete(request: Request, response: Response) {
            await useSafeHandler(request, response, async () => {
                await this.service.delete(
                    Number(request.params.id),
                    (request.user as UserModel).id
                )
                response.status(204).send()
            })
        }
    }
}

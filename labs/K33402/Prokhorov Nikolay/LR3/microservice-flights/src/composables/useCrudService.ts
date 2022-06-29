import { FindOptions, ModelStatic } from 'sequelize/types/model'
import { ObjectNotFoundError, ObjectPermisstionError } from '../errors'

export abstract class ModelCrudServiceBase<M extends ModelStatic<any>> {
    abstract getOwnedItem(pk: number, userId: number): Promise<InstanceType<M>>

    abstract list(options?: FindOptions<any>): Promise<InstanceType<M>[]>

    abstract item(pk: number, options?: FindOptions<any>): Promise<InstanceType<M> | null>

    abstract create(
        data: Record<string, any>,
        userId: number
    ): Promise<InstanceType<M>>

    abstract update(
        pk: number,
        data: Record<string, any>,
        userId: number
    ): Promise<InstanceType<M>>

    abstract delete(pk: number, userId: number): Promise<void>
}

export default function useCrudService<M extends ModelStatic<any>>(model: M) {
    return class ModelCrudService {
        async getOwnedItem(pk: number, userId: number) {
            const item = await model.findByPk(pk)
            if (item === null) throw new ObjectNotFoundError()
            if (item.createdBy !== userId) throw new ObjectPermisstionError()
            return item
        }

        async list(options?: FindOptions<any>): Promise<InstanceType<M>[]> {
            return await model.findAll(options)
        }

        async item(pk: number, options?: FindOptions<any>): Promise<InstanceType<M> | null> {
            return await model.findByPk(pk, options)
        }

        async create(
            data: Record<string, any>,
            userId: number
        ): Promise<InstanceType<M>> {
            data.createdBy = userId
            return await model.create(data)
        }

        async update(
            pk: number,
            data: Record<string, any>,
            userId: number
        ): Promise<InstanceType<M>> {
            const item = await this.getOwnedItem(pk, userId)
            return await item.update(data)
        }

        async delete(pk: number, userId: number): Promise<void> {
            const item = await this.getOwnedItem(pk, userId)
            return item.destroy()
        }
    }
}
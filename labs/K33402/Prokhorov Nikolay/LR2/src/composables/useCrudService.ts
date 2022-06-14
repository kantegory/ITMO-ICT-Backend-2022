import UserModel from '../models/users/UserModel'
import { ModelStatic } from 'sequelize/types/model'
import { ObjectNotFoundError, ObjectPermisstionError } from '../errors'

export abstract class ModelCrudServiceBase<M extends ModelStatic<any>> {
    abstract getOwnedItem(pk: number, userId: number): Promise<InstanceType<M>>

    abstract list(): Promise<InstanceType<M>[]>

    abstract item(pk: number): Promise<InstanceType<M> | null>

    abstract create(data: Record<string, any>, userId: number): Promise<InstanceType<M>>

    abstract update(pk: number, data: Record<string, any>, userId: number): Promise<InstanceType<M>>

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

        async list(): Promise<InstanceType<M>[]> {
            return await model.findAll()
        }

        async item(pk: number): Promise<InstanceType<M> | null> {
            return await model.findByPk(pk)
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

class Test extends useCrudService(UserModel) {
    async test() {
        const list_res = await this.list()
        const list_real = await UserModel.findAll()

        const item_res = await this.item(1)
        const item_real = await UserModel.findByPk(1)

        const create_res = await this.create({}, 1)
        const create_real = await UserModel.create({})

        const update_res = await this.update(1, {}, 1)
        const update_real = (await UserModel.findByPk())?.update({})

        const delete_res = await this.delete(1, 1)
        const delete_real = await (await UserModel.findByPk(1))?.destroy()
    }
}

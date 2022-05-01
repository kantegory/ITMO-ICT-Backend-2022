import dataSource from '../../providers/db'
import User from '../../models/users/User'
import checkPassword from '../../utils/checkPassword'
import { UpdateResult, DeleteResult } from 'typeorm'

class UserService {
    repository = dataSource.getRepository(User);

    async create(userData: object) : Promise<User> {
        try {
            const entity = Object.assign(new User(), userData)
            const user = await this.repository.save(entity)
            return user
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async getById(id: number) : Promise<User> {
        const user = await this.repository.findOneBy({ 'id': id })

        if (user) return user

        throw new Error(`User with id ${id} not found`)
    }

    async getByEmail(email: string) : Promise<User> {
        const user = await this.repository.findOneBy({ 'email': email })

        if (user) return user

        throw new Error(`User with email ${email} not found`)
    }

    async update(id: number, userData: object) : Promise<UpdateResult> {
        try {
            const newEntity = Object.assign(new User(), userData)
            const entity = await this.getById(id)
            for (const field in entity) {
                if (newEntity.hasOwnProperty(field)) {
                    entity[field] = newEntity[field]
                }
            }
            return await this.repository.update({ 'id' : id }, entity)
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id: number) : Promise<DeleteResult> {
        try {
            return await this.repository.delete({ 'id' : id })
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async getList() : Promise<User[]> {
        return await this.repository.find()
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        const user = await this.repository.findOneBy({ 'email': email })

        if (user) return { user: user, checkPassword: checkPassword(user, password) }

        throw new Error(`User with email ${email} not found`)
    }
}

export default UserService
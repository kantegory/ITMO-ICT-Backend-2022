import dataSource from '../../providers/db'
import User from '../../models/users/User'
import checkPassword from '../../utils/checkPassword'
import { UpdateResult, DeleteResult } from 'typeorm'

class UserService {
    async create(userData: object) : Promise<User> {
        try {
            const entity = Object.assign(new User(), userData)
            const user = await dataSource.getRepository(User).save(entity)
            return user
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async getById(id: number) : Promise<User> {
        const user = await dataSource.getRepository(User).findOneBy({ 'id': id })

        if (user) return user

        throw new Error(`User with id ${id} not found`)
    }

    async getByEmail(email: string) : Promise<User> {
        const user = await dataSource.getRepository(User).findOneBy({ 'email': email })

        if (user) return user

        throw new Error(`User with email ${email} not found`)
    }

    async update(id: number, userData: object) : Promise<UpdateResult> {
        try {
            const entity = Object.assign(new User(), userData)
            return await dataSource.getRepository(User).update({ 'id' : id }, entity)
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id: number) : Promise<DeleteResult> {
        try {
            return await dataSource.getRepository(User).delete({ 'id' : id })
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async getList() : Promise<User[]> {
        const user = await dataSource.getRepository(User).find()

        if (user) return user

        throw new Error(`No users found`)
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        const user = await dataSource.getRepository(User).findOneBy({ 'email': email })

        if (user) return { user: user, checkPassword: checkPassword(user, password) }

        throw new Error(`User with email ${email} not found`)
    }
}

export default UserService
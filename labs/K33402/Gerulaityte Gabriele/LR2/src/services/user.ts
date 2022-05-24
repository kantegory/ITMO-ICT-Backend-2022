import UserError from '../errors/users/user'
import { User } from '../models/user/user'
import { getRepository } from 'typeorm'

class UserService {
    async getById(id: string) {
        const userRepository = getRepository(User)
        const user = await userRepository.findOneBy({ id: parseInt(id) })

        if (user) return user

        throw new UserError('Not found!')
    }

    async getByEmail(email: string) {
        try {
            const userRepository = getRepository(User)
            return await userRepository.findOneBy({ email })
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }

    async create(user: any): Promise<User | Error> {
        try {
            const userRepository = getRepository(User)
            return await userRepository.save(user)
        } catch (e: any) {
            console.log(e)
            throw new UserError(e)
        }
    }

    async listUsers() {
        const userRepository = getRepository(User)
        const users = await userRepository.find()

        if (users) return users

        throw new UserError('Not found!')
    }

    async updateUser(id: string, data: any) {
        try {
            const userRepository = getRepository(User)
            const user = await userRepository.findOneBy({ id: parseInt(id) })
            if (user) {
                const result = await userRepository.save({ id: parseInt(id), ...data })
            }
            return user
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

    async deleteUser(id: string) {
        try {
            const userRepository = getRepository(User)
            await userRepository.delete({ id: parseInt(id) })
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

    async checkPassword(email: string, password: string): Promise<any> {
        try {
            const userRepository = getRepository(User)
            const data = await userRepository.findOneBy({
                email: email,
                password: password,
            })
            if (data) {
                return { user: data, passwordMatch: true }
            }
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }
}

export default UserService

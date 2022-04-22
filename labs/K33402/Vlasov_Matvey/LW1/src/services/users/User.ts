import dataSource from '../../providers/db'
import User from '../../models/users/User'
import checkPassword from '../../utils/checkPassword'

class UserService {
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

    async create(userData: object) : Promise<User> {
        try {
            const user = await dataSource.getRepository(User).save(userData)
            return user
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        const user = await dataSource.getRepository(User).findOneBy({ 'email': email })

        if (user) return { user: user, checkPassword: checkPassword(user, password) }

        throw new Error(`User with email ${email} not found`);
    }
}

export default UserService
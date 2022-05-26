import UserOperationError from "../errors/index";
import User from "../models/user"

class UserService {

    async create(userData: any) {
        try {
            const user = await User.create(userData)
            return user
        } catch (e: any) {
            throw new UserOperationError('creation_error')
        }
    }

    async getAll() {
        const user = await User.findAll()

        if (user) return user

        throw new UserOperationError('no_users')
    }

    async getById(id: number) {
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new UserOperationError('user_not_found')
    }

    async getByAge(age: number) {
        const user = await User.findAll({
            where: {
                age: age
            }
        })
        if (user) return user
        throw new UserOperationError('user_not_found')
    }
}

export default UserService
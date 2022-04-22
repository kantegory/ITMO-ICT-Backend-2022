import MyError from "../../errors";
import User from "../../models/user/user"

class UserService {

    async create(userData: any) {
        try {
            const user = await User.create(userData)

            return user.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new MyError(errors)
        }
    }

    async checkPassword(username: string, password: string) {
        const user = await User.findOne({ where: {username}})

        if (user) return { user: user.toJSON(), checkPassword: (user.password === password) }

        throw new MyError('Incorrect login or password!')
    }

    async getAll() {
        const users = await User.findAll()

        if (users) return users

        throw new MyError('Users are not found')
    }

    async getById(id: number) {
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new MyError('User with this id not found')
    }

    async getByUsername(username: string) {
        const user = await User.findOne({
            where: {
                username: username
            }
        })

        if (user) return user.toJSON()

        throw new MyError('User with this username not found')
    }
}

export default UserService
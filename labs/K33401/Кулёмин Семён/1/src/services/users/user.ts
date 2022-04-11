import db from "../../models";
import UserError from "../../errors/users/user";

class UserService {
    async create(userData: object) {
        try {
            const user = await db.User.create(userData)

            return user.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

    async getById(id: number) {
        const user = await db.User.findByPk(id)

        if (user) return user.toJSON()

        throw new UserError('User with this id not found')
    }
}

export default UserService
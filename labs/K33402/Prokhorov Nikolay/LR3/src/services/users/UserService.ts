import UserModel from '../../models/users/UserModel'
import UserError from '../../errors/users/UserError'
import checkPassword from '../../utils/checkPassword'

export default class UserService {
    async getById(id: number): Promise<UserModel> {
        const user = await UserModel.findByPk(id)

        if (user) return user.toJSON()

        throw new UserError('Not found!')
    }

    async create(userData: object): Promise<UserModel | UserError> {
        try {
            const user = await UserModel.create(userData as any)

            return user.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

    async checkPassword(email: string, password: string): Promise<any> {
        const user = await UserModel.findOne({ where: { email } })

        if (user)
            return {
                user: user.toJSON(),
                checkPassword: checkPassword(user, password),
            }

        throw new UserError('Incorrect login/password!')
    }
}

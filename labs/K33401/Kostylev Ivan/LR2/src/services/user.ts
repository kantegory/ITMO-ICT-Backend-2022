import { UserOperationError } from "../errors/index";
import User from "../models/user/user"
import UserInstance from "../models/user/user"

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

    async updateUserInfo(newUserInfo: any) {
        const user = await User.findByPk(newUserInfo.id)
        if (user) {
            user.update({ 
                username: (newUserInfo.username != undefined) ? newUserInfo.username : user.username,
                email: (newUserInfo.email != undefined) ? newUserInfo.email : user.email,
                address: (newUserInfo.address != undefined) ? newUserInfo.address : user.address,
                age: (newUserInfo.age != undefined) ? newUserInfo.age : user.age
            })
            return user
        } else { 
            throw new UserOperationError('user_not_found')
        }
    }

    async updateUserPassword(userId: number, newPassword: any) {
        const user = await User.findByPk(userId)
        if (user) {
            user.update({password: newPassword})
            return user
        } else {
            throw new UserOperationError('user_not_found')
        }
    }
}

export default UserService
import { userInfo } from "os"
import UserError from "../errors/users/user"
import User from "../models/index"


class UserService {
    async getById(id: string){
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw Error("getbyID service not working")

    }

    async create(user: any): Promise<User|Error>{
        try {
            const userData = await User.create(user)
            return userData
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }

    }

    async listUsers(){
        const users = await User.findAll()

        if (users) return users

        throw Error("listUsers service not working")
    }

    async updateUser(id:string, data: any) {
        try {
            const user = await User.findByPk(id)
            if (user) {
                user.update(data)
            }
            return user
        } catch {
            throw Error("updateUser service not working")
        }
    }
    
    async deleteUser(id:string) {
        try {
            await User.destroy({where: {id:id}})
        } catch {
            throw Error("updateUser service not working")
        }
    }

}

export default UserService
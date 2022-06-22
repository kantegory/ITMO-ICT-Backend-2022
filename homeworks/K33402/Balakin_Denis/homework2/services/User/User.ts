import User from "../../models/User/User"
import UserError from "../../errors/User/User";

class UserService {

    async create(userData: any): Promise<User> {
        const user = await User.create(userData)
        return user.toJSON()
    }

    async getById(id: number): Promise<User> {
        const user: User | null = await User.findByPk(id)
        if (user != null) {
            return user.toJSON()
        }
        throw new UserError("Invalid identifier")
    }

    async getByEmail(email: string): Promise<User|null> {
        const user: User | null = await User.findOne({
            where: {
               email: email,
            },
        })
        return user
    }

    async update(userData: any): Promise<User> {    
        if (userData.id == undefined) {
            throw new UserError("Id is undefined")
        }

        await User.update(userData, { where: {
            id: userData.id
        }})
        let user: User = await this.getById(userData.id)
        return user
    }

    async delete(id: number): Promise<void> {
        const user: User | null = await User.findByPk(id)
        if (user != null) {
            return user.destroy()
        }

        throw new UserError("Invalid identifier")
    }
}

export default UserService
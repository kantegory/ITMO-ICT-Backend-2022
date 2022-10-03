import User from "../../models/User"

class UserService {
    async getAllUsers() : Promise<User[]> {
        const users = await User.findAll()
        return users
    }

    async getUserByID(id: number) : Promise<User|Error> {
        const user = await User.findByPk(id);
        if (user) {
            return user.toJSON()
        }
        throw new Error()
    }

    async createUser(userData: any) : Promise<User|Error> {
        try {
            const user = await User.create(userData)
            return user.toJSON()
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async updateUser(userData: any) : Promise<User|Error> {
        try {
            const user = await User.findByPk(userData.id)
            if (user) {
                await user.update(userData, { where: { id: userData.id } })
                return user.toJSON()
            } else {
                throw new Error('No user with such id')
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async deleteUser(id: number) : Promise<void|Error> {
        try {
            const user = await User.findByPk(id)
            if (user) {
                user.destroy()
            } else {
                throw new Error('No user with such id')
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

export default UserService
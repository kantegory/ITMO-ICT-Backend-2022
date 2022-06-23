import User from "../models/User"
import { passwordHash } from "../utils/passwordHash";
import { Op } from "sequelize";

class UserService {

    async create(userData: any): Promise<User> {
        userData.password = passwordHash(userData.password)
        userData.role = "user"

        const user = await User.create(userData)
        return user.toJSON()
    }

    async getById(id: number): Promise<User|Error> {
        const user: User | null = await User.findByPk(id)
        if (user == null) {
            throw new Error("Invalid identifier")
        }

        return user.toJSON()
    }

    async get(username: string, password: string): Promise<User> {
        const hash: string = passwordHash(password);
        const user: User | null = await User.findOne({
            where: {
                [Op.or]: {
                    username: username,
                    email: username,
                },
                password: hash
            }
        })

        if (user == null) {
            throw new Error("Invalid credentials")
        }

        return user.toJSON()
    }

    async getAll(): Promise<User[]> {
        return User.findAll()
    }

    async updateUser(newUserData: any): Promise<any> {
        if (newUserData.id === undefined) {
            throw new Error("Id must be presented")
        }

        return User.update(newUserData, {
            where: {
                id: newUserData.id
            },
            returning: true
        })
    }

    async delete(id: number): Promise<void> {
        const user: User | null = await User.findByPk(id)
        if (user == null) {
            throw new Error("Invalid identifier")
        }

        return user.destroy()
    }
}

export default UserService
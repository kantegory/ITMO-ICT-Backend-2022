import User from "../models/User"
import { Op } from "sequelize";
import e from "express";

class UserService {

    async create(userData: any): Promise<User> {
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

    async get(username?: string, email?: string): Promise<User> {
        const whereBlock: any = {}
        if (username) {
            whereBlock.username = username
        }
        else if (email) {
            whereBlock.email = email
        }

        const user: User | null = await User.findOne({
            where: whereBlock
        })

        if (user == null) {
            throw new Error("Invalid credentials")
        }

        return user.toJSON()
    }

    async getAll(): Promise<User[]> {
        return User.findAll()
    }

    async update(newUserData: any): Promise<any> {
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
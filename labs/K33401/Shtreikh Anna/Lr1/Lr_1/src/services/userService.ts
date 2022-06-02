import User from '../db/models/user';

class UserService {
    async getAll(){
        const users = await User.findAll()

        if (users) return users
        else return { "msg": "users not found" }

    }
    async getById(id: number) {
        const user = await User.findByPk(id)

        if (user) return user

        throw new Error(`User with id ${id} not found`)
    }

    async getByEmail(email: string) {
        const user = await User.findOne({ where: { email: email } })

        if (user) return user

        throw new Error(`User with email ${email} not found`)
    }

    async create(userInfo: any) {
        try {
            const newUser = await User.create(userInfo)
            return newUser
        } catch (e: any) {
            throw new Error(e)
        }
    }
    
    async update(id:number, data: any) {
        try {
            const user = await User.findByPk(id)
            if (user) {
                user.update(data)
            }
            return user
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id:number) {
        try {
            await User.destroy({where: {id:id}})
        } catch (e: any) {
            throw new Error(e)
        }
    }

}

export default UserService 
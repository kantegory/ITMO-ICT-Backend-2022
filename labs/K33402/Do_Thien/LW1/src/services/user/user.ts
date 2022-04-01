import User, { UserInput, UserOutput } from '../../models/users/user'
import UserError from '../../errors/users/user'


class UserService {
    async getById(id: number) : Promise<User | UserError> {
        const user = await User.findByPk(id)

        if (user) return user
        
        throw new UserError('Not found!')
        
    }

    async getAll() : Promise<User[]> {
        const user = await User.findAll()

        if (user) return user
        
        throw new UserError('Not found!')
        
    }

    async create(userData: object) : Promise<User | UserError> {
        try {
            const user = await User.create(userData)

            return user
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

    async update(id: number, userData: object) : Promise<User | UserError> {
        const user = await User.findByPk(id)

        if (user) {
            const updatedUser = await (user as User).update(userData)
            return updatedUser
        }

        throw new UserError('Not found!')
    }

    async delete(id: number) : Promise<boolean> {
        const user = await User.destroy({
            where: {id}
        })
        if(user) {
            return !!user
        }
        
        throw new UserError('Not found!')
    }
    
}

export default UserService
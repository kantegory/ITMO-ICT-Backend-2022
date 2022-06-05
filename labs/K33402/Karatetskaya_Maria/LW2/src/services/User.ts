import User from "../models/User";

class UserService {
    async getUsers() : Promise<User[]> {
        return await User.findAll()
    }

    async getUser(id: number) : Promise<User> {
        let user: User | null = await User.findByPk(id);
        if (!user) {
            throw new Error();
        }
        return user;
    }

    async createUser(userData: any) : Promise<User|Error> {
        try {
            console.log(userData)
            const user = await User.create(userData);
            return user.toJSON();
        }
        catch (error: any) {
            console.log(error)
            throw new Error(error);
        }
    }

    async updateUser(userData: any): Promise<void|Error> {
        try {
            const user: User | null = await User.findByPk(userData.id)
            if (user == null) {
                throw new Error
            }
            user.set(userData)
            console.log(user.toJSON())
            // user.save()
        }
        catch (error: any) {
            throw new Error
        }
    }

    async deleteUser(userId: number): Promise<void|Error> {
        try {
            const user: User | null = await User.findByPk(userId)
            if (user == null) {
                throw new Error
            }
            user.destroy()
        }
        catch(error: any) {
            
        }
    }
}

export default UserService
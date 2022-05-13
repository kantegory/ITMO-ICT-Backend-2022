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
            const user = await User.create(userData);
            return user.toJSON();
        }
        catch (error: any) {
            throw new Error(error);
        }
    }
}

export default UserService
import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../../orm/models/users/User';

class UserService {

    async getById(id: number): Promise<User> {
        const user = await getRepository(User).findOne(id);

        if (user) return user;

        throw new Error('User with specified ID is not found');
    }

    async getByEmail(email: string): Promise<User> {
        const user = await getRepository(User).findOne({ where: { email } });

        if (user) return user;

        throw new Error('User with specified email is not found');
    }

    async create(userData: { email: string, password: string }): Promise<User> {
        try {
            userData.password = bcrypt.hashSync(userData.password, 8)
            let user = getRepository(User).create(userData)
            user = await getRepository(User).save(user)
            return user
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async checkPassword(email: string, password: string): Promise<any> {
        // const user = await getRepository(User).findOne({ where: { email } })
        const user = await getRepository(User)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", { email })
            .getOne()

        if (!user) {
            throw new Error('Does not exist')
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        return { user: user, passwordMatch: passwordMatch }

    }
}

export default UserService

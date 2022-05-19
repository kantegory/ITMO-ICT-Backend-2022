import { User } from "../orm/models/User"
import {getConnection} from "typeorm";

class UserService {
    public async getById(id: number): Promise<User> {
        return await getConnection().getRepository(User).findOne({ where: { id: id } }).then((user) => {
            if (!user) {
                throw new Error(`User (id=${id}) does not exist`);
            }

            return user;
        });
    }

    public async create(userData: {email: string, password: string}): Promise<User> {
        const userRepo = getConnection().getRepository(User);

        await userRepo.findOne({ where: { email: userData.email } }).then((user) => {
            if (user !== null) {
                throw new Error('User with such email already exists');
            }
        });

        // todo hash pass
        return userRepo.save(userData);
    }
}

export default UserService

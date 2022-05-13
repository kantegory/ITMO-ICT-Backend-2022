import User from "../../models/users/User";
import UserError from "../../errors/users/User";

class UserService {
    async getById(id: number): Promise<User> {
        const user = await User.findByPk(id);

        if (user) return user.toJSON();

        throw new UserError("Not found!");
    }

    async create(userData: object): Promise<User | UserError> {
        try {
            const user = await User.create(userData);

            return user.toJSON();
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);

            throw new UserError(errors);
        }
    }

    async updateById(id: number, userData: object): Promise<User | UserError> {
        try {
            const user = await User.findByPk(id);

            if (!user) throw new UserError("User not found");

            user.set({ ...userData });

            await user.save();

            return user.toJSON();
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);

            throw new UserError(errors);
        }
    }

    async deleteById(id: number): Promise<void> {
        try {
            const user = await User.findByPk(id);

            if (user) {
                await user.destroy();
            }
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);

            throw new UserError(errors);
        }
    }
}

export default UserService;

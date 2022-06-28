import User from "../../models/users/User";
import checkPassword from "../../utils/checkPassword";

class UserService {
    async getById(id: number): Promise<User> {
        // Получение пользователя по ID
        const user = await User.findByPk(id);
        if (user) {
            return user.toJSON();
        }
        throw new Error('Пользователь не найден');
    }

    async create(userData: any): Promise<User> {
        // Создание пользователя
        try {
            const user = await User.create(userData);
            await user.reload();
            return user.toJSON();
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message);
            throw new Error(errors);
        }
    }

    async update(id: number, userData: any): Promise<User> {
        // Обновление пользователя
        let user = await User.findByPk(id);
        if (user) {
            try {
                user = await user.update(userData);
                await user.reload();
                return user.toJSON();
            } catch (e: any) {
                const errors = e.errors.map((error: any) => error.message);
                throw new Error(errors);
            }
        }
        throw new Error('Пользователь не найден')
    }

    async checkPassword(email: string, password: string): Promise<any> {
        // Проверка пароля пользователя
        const user = await User.findOne({where: {email}});
        const userFull = await User.scope('full').findOne({where: {email}});
        if (user) {
            return {user: user.toJSON(), checkPassword: checkPassword(userFull, password)};
        }
        throw new Error('Неверный логин или пароль');
    }
}

export default UserService

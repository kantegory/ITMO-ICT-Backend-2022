import User from "../../models/users/User";
import UserService from "../../services/users/UserService";

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    create = async (request: any, response: any) => {
        // Создание нового пользователя
        const {body} = request;
        try {
            const user: User = await this.userService.create(body);
            response.status(201).send(user);
        } catch (error: any) {
            response.status(400).send({'error': error.message});
        }
    }

    getMe = async (request: any, response: any) => {
        // Получение текущего пользователя
        response.send(request.user);
    }

    updateMe = async (request: any, response: any) => {
        // Обновление текущего пользователя
        const {body, user} = request;

        try {
            const updatedUser: User = await this.userService.update(user.id, body);
            response.status(200).send(updatedUser);
        } catch (error: any) {
            response.status(400).send({'error': error.message});
        }
    }
}

export default UserController

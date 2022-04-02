import User from "../../models/users/User";
import UserService from "../../services/users/User";
import UserError from "../../errors/users/User";

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    get = async (request: any, response: any) => {
        try {
            const user: User | UserError = await this.userService.getById(Number(request.params.id));

            response.send(user);
        } catch (error: any) {
            response.status(404).send({ error: error.message });
        }
    };

    post = async (request: any, response: any) => {
        const { body } = request;

        try {
            const user: User | UserError = await this.userService.create(body);

            response.status(201).send(user);
        } catch (error: any) {
            response.status(400).send({ error: error.message });
        }
    };

    put = async (request: any, response: any) => {
        const { body } = request;

        try {
            const user: User | UserError = await this.userService.updateById(Number(request.params.id), body);

            response.status(200).send(user);
        } catch (error: any) {
            response.status(400).send({ error: error.message });
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.userService.deleteById(Number(request.params.id));

            response.status(204).send();
        } catch (error: any) {
            response.status(400).send({ error: error.message });
        }
    }
}

export default UserController;

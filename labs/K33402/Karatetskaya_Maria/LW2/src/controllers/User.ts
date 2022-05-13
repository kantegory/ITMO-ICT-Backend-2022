import User from "../models/User";
import UserService from "../services/User";

class UserController {
    private userService: UserService = new UserService();

    getAll = async (request: any, response: any): Promise<void> => {
        if (!request.user) {
            response.status(401).send({ error: "Unauthenticated" });
            return
        }

        

        const users : User[] = await this.userService.getUsers()
        response.send(users)
    }

    get = async (request: any, response: any): Promise<void> => {
        if (!request.user) {
            response.status(401).send({ error: "Unauthenticated" });
            return
        }

        const user: User | Error = await this.userService.getUser(Number(request.params.id));
        if (user) {
            response.send(user)
        }
        else {
            response.status(404)
        }        
    }

    create = async (request: any, response: any): Promise<void> => {
        if (!request.user) {
            response.status(401).send({ error: "Unauthenticated" });
            return
        }

        const { body } = request
        console.log(request.body)
        const user: User | Error = await this.userService.createUser(body)

        response.send(user)
    }

    update = async (request: any, response: any): Promise<void> => {
        if (!request.user) {
            response.status(401).send({ error: "Unauthenticated" });
            return
        }

        await this.userService.updateUser(request.body)
        response.send("")
    }

    delete = async (request: any, response: any): Promise<void> => {
        if (!request.user) {
            response.status(401).send({ error: "Unauthenticated" });
            return
        }

        await this.userService.deleteUser(request.params.id)
        response.send("")
    }
    
}

export default UserController
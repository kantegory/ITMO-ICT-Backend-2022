import User from "../models/User";
import UserService from "../services/User";

class UserController {
    private userService: UserService = new UserService();

    getAll = async (request: any, response: any): Promise<void> => {
        const users : User[] = await this.userService.getUsers()
        response.send(users)
    }

    get = async (request: any, response: any): Promise<void> => {
        const user: User | Error = await this.userService.getUser(Number(request.params.id));
        if (user) {
            response.send(user)
        }
        else {
            response.status(404)
        }        
    }
}

export default UserController
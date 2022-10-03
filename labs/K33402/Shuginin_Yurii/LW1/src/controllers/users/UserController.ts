import User from '../../models/User'
import UserService from '../../services/users/UserService'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    all = async (request: any, response: any) => {
        const users : User[] = await this.userService.getAllUsers()
        response.send(users)
    }

    get = async (request: any, response: any) => {
        try {
            const user : User | Error = await this.userService.getUserByID(request.params.id)
            response.send(user)
        } catch (error: any) {
            response.status(404).send(error.message)
        }
    }

    post = async (request: any, response: any) => {
        const userData = request.body
        try {
            const user : User | Error = await this.userService.createUser(userData)
            response.send(user)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    update = async (request: any, response: any) => {
        const userData = request.body
        try {
            const user : User | Error = await this.userService.updateUser(userData)
            response.send(user)
        } catch (error: any) {
            response.status(400).send(error.message)
        }
    }

    delete = async (request: any, response: any) => {
        try {
            await this.userService.deleteUser(request.params.id)
            response.send('User deleted successfully')
        } catch (error: any) {
            response.status(404).send(error.message)
        }
    }
}

export default UserController
import User from '../../models/users/User'
import UserService from '../../services/user/user'
import UserError from '../../errors/users/User'


class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: any, response: any) => {
        try {
            const user: User | UserError = await this.userService.getById(
                Number(request.params.id)
            )

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            const user : User|UserError = await this.userService.create(body)

            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    all = async (request: any, response: any) => {
        try {
            const user: User[] = await this.userService.getAll()

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        const { body } = request
        const id = Number(request.params.id)
        try {
            const user: User | UserError = await this.userService.update(id, body)

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        const id = Number(request.params.id)
        try {
            const user = await this.userService.delete(id)

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }   

    
}

export default UserController
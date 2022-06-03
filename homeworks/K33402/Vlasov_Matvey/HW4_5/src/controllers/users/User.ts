import { UpdateResult, DeleteResult } from 'typeorm'
import User from '../../models/users/User'
import UserService from '../../services/users/User'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    private sendError(response: any, error: any) {
        let statusCode = 400
        if (error.message.includes('not found')) statusCode = 404
        response.status(statusCode).send({ "error": error.message })
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request

            const res: User | Error = await this.userService.create(body)

            response.status(201).send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    retrieve = async (request: any, response: any) => {
        try {
            const res: User | Error = await this.userService.getById(Number(request.params.id))

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    update = async (request: any, response: any) => {
        try {
            const { body } = request

            const res: UpdateResult | Error = await this.userService.update(Number(request.params.id), body)

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const res: DeleteResult | Error = await this.userService.delete(Number(request.params.id))

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    getList = async (request: any, response: any) => {
        try {
            const res: User[] | Error = await this.userService.getList()

            response.send(res)
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

    login = async (request: any, response: any) => {
        const { body } = request

        const { email, password } = body

        try {
            const { user, checkPassword } = await this.userService.checkPassword(email, password)
            if (checkPassword) {
                response.send(`You successfully logged in as ${user.firstName} ${user.lastName}`)
            } else {
                response.send("Your email/password is incorrect!")
            }
        } catch (error: any) {
            this.sendError(response, error)
        }
    }

}

export default UserController
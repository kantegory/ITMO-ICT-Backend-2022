import User from '../../models/users/User'
import UserService from '../../services/users/User'
import hashPassword from '../../utils/hashPassword'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    create = async (request: any, response: any) => {
        try {
            const { body } = request
            body.password = hashPassword(body.password)

            const user: User | Error = await this.userService.create(body)

            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    retrieve = async (request: any, response: any) => {
        try {
            const user: User | Error = await this.userService.getById(Number(request.params.id))

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
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
            response.status(400).send({ "error": error.message })
        }
    }

}

export default UserController
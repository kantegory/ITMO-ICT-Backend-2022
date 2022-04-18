import UserService from "../../services/users/index";
import jwt from "jsonwebtoken"
import UserError from "../../errors/users";
import {jwtOptions} from "../../middlewares/password";


class UserController {
    private userService = new UserService

    constructor() {
        this.userService = new UserService()
    }

    post = async (request: any, response: any) => {
        // проверка на уникальность
        const { body } = request

        try {
            const user = await this.userService.create(body)

            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }

    }

    login = async (request: any, response: any) => {
        const { body } = request

        const { username, password } = body

        try {
            const { user, checkPassword } = await this.userService.checkPassword(username, password)

            if (checkPassword) {
                const payload = { username: user.username }

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

                response.send({ accessToken })
            } else {
                throw new UserError("Incorrect password!")
            }
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    refreshToken = async (request: any, response: any) => {

    }

    getAll = async (request: any, response: any) => {
        try {
            const users = await this.userService.getAll()

            response.send(users)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const user = await this.userService.getById(
                Number(request.params.id)
            )

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getByUsername = async (request: any, response: any) => {
        try {
            const user = await this.userService.getByUsername(
                request.params.username
            )

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default UserController
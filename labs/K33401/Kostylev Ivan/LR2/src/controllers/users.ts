import UserService from "../services/user";
import jwt from "jsonwebtoken";
import { jwtOptions } from "../middleware/password";

class UserController {

    private userService = new UserService

    constructor() {
        this.userService = new UserService()
    }

    getHello = async (request: any, response: any) => {
        response.send('Hello world!')
    }

    createUser = async (request: any, response: any) => {
        const { body } = request
        try {
            const user = await this.userService.create(body)
            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error_msg": error.message })
        }
    }

    getAboutUser = async (request: any, response: any) => {
        response.send(request.user)
    }

    updateUser = async (request: any, response: any) => {
        const { newUserInfo } = request
        try {
            const user = await this.userService.updateUserInfo(newUserInfo)
            response.status(200).send(user.toJSON());
        } catch (error: any) {
            response.status(404).send({ "error_msg": error.message })
        }
    }

    getAll = async (request: any, response: any) => {
        try {
            const users = await this.userService.getAll()
            response.status(200).send(users)
        } catch (error: any) {
            response.status(404).send({ "error_msg": error.message })
        }
    }

    getById = async (request: any, response: any) => {
        try {
            const user = await this.userService.getById(Number(request.params.id))
            response.status(200).send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    login = async (request: any, response: any) => {
        const { username, password } = request.body
        if (username && password) {
            const service = new UserService()
            let user = await service.getByUsername(username)
            if (!user) {
                response.status(404).json({ msg: 'no_such_user_found', user })
            }
            if (user.password === password) {
                let payload = { id: user.id }
                let token = jwt.sign(payload, jwtOptions.secretOrKey)
                response.json({ msg: 'ok', token: token })
            } else {
                response.status(401).json({ msg: 'Password is incorrect' })
            }
        }
    }

    getByAge = async (request: any, response: any) => {
        try {
            const user = await this.userService.getByAge(request.params.age)
            response.status(200).send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default UserController
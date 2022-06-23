import UserService from "../../services/index";

class UserController {

    private userService = new UserService

    constructor() {
        this.userService = new UserService()
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

    getById = async (request: any, response: any) => {
        try {
            const user = await this.userService.getById(Number(request.params.id))
            response.send(user)
        } catch (error: any) {
            response.status(200).status(404).send({ "error": error.message })
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
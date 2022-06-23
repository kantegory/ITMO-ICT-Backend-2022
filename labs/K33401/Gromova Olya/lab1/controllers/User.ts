import User from "../models/User"
import UserService from "../services/User"
import authMiddleware from "../middleware/authenticate"
import * as _ from "lodash"


class UserController {
    private userService: UserService = new UserService()

    register = async (request: any, response: any) => {
        const { body } = request
        try {
            await this.userService.create(body)
            response.status(200).send({ "status" : "OK" })
        }
        catch (error: any) {
            response.status(400).send({ "error" : error.message })
        }
    }

    login = async (request: any, response: any) => {
        const { body } = request
        const username = body.username || body.email
        try {
            const user: User = await this.userService.get(username, body.password)
            const token: string = await authMiddleware.createToken(user)

            response.status(200).send({ token: token })
        }
        catch (error: any) {
            response.status(400).send(error.message)
        }
               
    }

    currentUser = async (request: any, response: any) => {
        if (request.user === undefined) {
            response.sendStatus(401)
        }
        else {
            try {
                const user = await this.userService.getById(request.user.id)
                response.status(200).send(_.omit(user, ['password']))
            }
            catch (error: any) {
                response.sendStatus(500)
            }
        }
    }
}

export default UserController
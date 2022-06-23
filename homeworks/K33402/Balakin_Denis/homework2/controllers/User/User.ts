import UserService from "../../services/User/User"
import UserError from "../../errors/User/User"


class UserController {
    private userService: UserService = new UserService()

    create = async (request: any, response: any) => {
        const { body } = request
        try {
            const user = await this.userService.create(body)
            response.status(201).send(user)
        }
        catch (err) {
            response.status(400).send((err as UserError).message)
        }
    }

    get = async (request: any, response: any) => {
        const { email } = request.body
        if (!email)
            response.status(400).send("Email wasn't provided")
        else {
            try {
                const user = await this.userService.getByEmail(email)
                if (user == null)
                    response.status(400).send("Invalid email")
                else
                    response.status(200).send(user)
            }
            catch (err) {
                response.status(500).send((err as UserError).message)
            }
        }
    }
}

export default UserController
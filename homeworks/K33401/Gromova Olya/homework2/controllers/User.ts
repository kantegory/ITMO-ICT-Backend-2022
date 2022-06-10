import UserService from "../services/User"
import * as _ from "lodash"


class UserController {
    private userService: UserService = new UserService()

    get = async (request: any, response: any) => {
        const { username, email } = request.body

        if (!username && !email) {
            response.status(400).send("Username or email should be provided")
        }
        else {
            try {
                const user = await this.userService.get(username, email)
                response.send(user)
            }
            catch (error: any) {
                response.status(400).send(error.message)
            }
        }

    }
}

export default UserController
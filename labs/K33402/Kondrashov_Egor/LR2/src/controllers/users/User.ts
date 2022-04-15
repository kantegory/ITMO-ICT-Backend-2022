import UserService from '../../services/users/User'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    retrieve = async (request: any, response: any) => {
        try {
            const user = await this.userService.getById(
                Number(request.params.id)
            )
            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    me = async (request: any, response: any) => {
        response.send(request.user)
    }

}

export default UserController

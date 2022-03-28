import jwt from 'jsonwebtoken'
import { jwtOptions } from '../../middleware/passport'
import UserService from '../../services/users/User'

class AuthController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    register = async (request: any, response: any) => {
        try {
            const user = await this.userService.getByEmail(request.body.email);

            if (user) {
              response.status(400).send({ "error": "User with specified email already exists" })
            }
        }

        catch (error: any) {
            try {
                const user = await this.userService.create(request.body)
                response.status(201).send(user)
            } catch (error: any) {
                response.status(400).send({ "error": error.message })
            }
        }
    }

    login = async (request: any, response: any) => {
        const { body } = request

        const { email, password } = body

        try {
            const { user, passwordMatch } = await this.userService.checkPassword(email, password)

            if (passwordMatch) {
                const payload = { id: user.id }

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

                response.send({ accessToken })
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (e: any) {
            response.status(401).send({ "error": e.message })
        }
    }

}

export default AuthController

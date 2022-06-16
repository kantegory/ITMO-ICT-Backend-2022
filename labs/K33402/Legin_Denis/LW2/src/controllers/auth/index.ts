import UserService from "../../services/user";
import { jwtOptions } from "../../core";

export default class AuthController {

    post = async (request: any, response: any) => {
        const { email, password } = request.body
        if (email && password) {
            const service = new UserService()
            const user = await service.getByEmail(email)
            if (!user) {
                response.status(401).json({ msg: 'No such user found', user })
            }
            if (user!!.password === password) {
                const payload = { id: user!.id }
                const jwt = require('jsonwebtoken')
                const token = jwt.sign(payload, jwtOptions.secretOrKey)
                response.json({ msg: 'ok', token })
            } else {
                response.status(401).json({ msg: 'Password is incorrect' })
            }
        }
    }
}

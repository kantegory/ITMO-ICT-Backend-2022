import axios from "axios"

export default class AuthController {

    post = async (request: any, response: any) => {
        const { email, password } = request.body
        const secretOrKey = 'test101'
        if (email && password) {
            const user = await axios.get("http://localhost:8080/v1/user", {
                params: {
                    email
                }
            })
            if (!user) {
                response.status(401).json({ msg: 'No such user found', user })
            }
            if (user!!.data.password === password) {
                const payload = { id: user!.data.id }
                const jwt = require('jsonwebtoken')
                const token = jwt.sign(payload, secretOrKey)
                response.json({ msg: 'ok', token })
            } else {
                response.status(401).json({ msg: 'Password is incorrect' })
            }
        }
    }
}
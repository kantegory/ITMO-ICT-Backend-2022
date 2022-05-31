import axios from "axios"

export default class AuthController {

    post = async (request: any, response: any) => {
        const { email, password } = request.body
        const secretOrKey = 'test123'
        if (email && password) {
            let user = await axios.get("http://main:8000/v1/user", {
                params: {
                    email: email
                }
            })
            if (!user) {
                response.status(401).json({ msg: 'No such user found', user })
            }
            if (user!!.data.password === password) {
                let payload = { id: user!.data.id }
                const jwt = require('jsonwebtoken')
                let token = jwt.sign(payload, secretOrKey)
                response.json({ msg: 'ok', token: token })
            } else {
                response.status(401).json({ msg: 'Password is incorrect' })
            }
        }
    }
}
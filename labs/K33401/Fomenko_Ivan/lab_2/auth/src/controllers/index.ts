import axios from "axios"

class AuthController {
    post = async (request: any, response: any) => {
        const data = request.body
        const secretOrKey = 'jamesbond'
        if (data.email && data.password) {

            let user = await axios.get("http://localhost:8000/v1/user", {
                params: {
                    email: data.email
                }
            })

            if (!user) {
                response.status(401).json({ msg: 'We dont have such a user', user })
            }

            if (user!!.data.password === data.password) {
                let jwt_payload = { id: user!.data.id }
                const jwt = require('jsonwebtoken')
                let token = jwt.sign(jwt_payload, secretOrKey)
                response.json({ msg: 'ok', token: token })
            } else {
                response.status(401).json({ msg: 'Password is incorrect' })
            }
        }
    }
}

export default AuthController
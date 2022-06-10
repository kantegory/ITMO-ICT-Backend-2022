import axios from "axios"
import jwt from "jsonwebtoken"
const jwtSecret: jwt.Secret = "sUbGuVE~t[)ByQDjcV?LCa_c4};LI-_n"

class Auth {
    auth = async (request: any, response: any, next: any) => {
        const authHeader = request.headers['authorization']

        if (authHeader) {
            try {
                const token = authHeader.split(' ')[1]
                const userPayload: any = jwt.verify(token, jwtSecret)
                const userResponse = await axios.get(`http://localhost:11111/user/secret/getById/${userPayload.id}`)
                request.user = userResponse.data

                next()
            }
            catch (error: any) {
                response.status(401)
            }
        }
        else {
            response.sendStatus(401)
        }
    }
}

export default new Auth()
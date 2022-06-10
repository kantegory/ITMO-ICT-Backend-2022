import jwt from "jsonwebtoken"
import jwtsecret from "../config/jwtsecret"

import * as _ from "lodash"

class AuthMiddleware {

    authenticate = async (request: any, response: any, next: any) => {
        var authHeader = request.headers.authorization
        if (authHeader) {
            try {
                const token = authHeader.split(' ')[1]
                console.log(token)
                const user = await this.authenticateToken(token)
                console.log(user)
                request.user = user

                next()
            }
            catch (error: any) {
                response.sendStatus(401)
            }
            
        }
        else {
            response.sendStatus(401)
        }
    }

    createToken = async (user: any): Promise<string> => {
        return jwt.sign(_.pick(user, ['id', 'username', 'role']), jwtsecret)
    }

    authenticateToken = async (token: string): Promise<any> => {
        return jwt.verify(token, jwtsecret)
    }
}

export default new AuthMiddleware()
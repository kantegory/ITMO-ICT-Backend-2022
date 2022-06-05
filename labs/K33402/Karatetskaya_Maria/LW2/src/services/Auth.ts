import { randomUUID } from "crypto";
import RefreshToken from "../models/RefreshToken";
import User from "../models/User";

class AuthService {

    async tryLogin(username: string, password: string) {
        const user: User | null = await User.findOne({ where: {
            username: username,
            password: password,
        }})

        if (!user) {
            throw new Error("Invalid credentials")
        }
        return user
    }

    async authenticate(token: string) {
        const refreshToken = await RefreshToken.findOne({ where: { jwt: token }})
        if (!refreshToken)
            return null

        const user = await User.findByPk(refreshToken.userId)
        return user
    }
    
}

export default AuthService
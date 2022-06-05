import User from "../models/User";
import AuthService from "../services/Auth";
import passport, { jwtOptions } from "../middlewares/passport";

import jwt from "jsonwebtoken"
import RefreshTokenService from "../services/RefreshToken";
import UserService from "../services/User";

class AuthController {
    private authService: AuthService = new AuthService
    private userService: UserService = new UserService

    login = async (request: any, response: any) => {
        const body = request.body
        const { username, password } = body

        try {
            const user: User = await this.authService.tryLogin(username, password)
            const payload = { id: user.id }
            const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

            const refreshTokenService = new RefreshTokenService(user)
            const refreshToken = await refreshTokenService.generateRefreshToken(accessToken)

            response.cookie('AccessToken', accessToken)
            response.send({ accessToken, refreshToken })
        }
        catch (error: any) {
            response.status(400).send(error)
        }
    }

    refreshToken = async (request: any, response: any) => {
        const { body } = request
        const { refreshToken } = body

        const refreshTokenService = new RefreshTokenService()

        try {
            const { userId, isExpired } = await refreshTokenService
                .isRefreshTokenExpired(refreshToken)

            if (!isExpired && userId) {
                const user = await this.userService.getUser(userId)

                const payload = { id: user.id }

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

                const refreshTokenService = new RefreshTokenService(user)

                const refreshToken = await refreshTokenService.generateRefreshToken(accessToken)

                response.send({ accessToken, refreshToken })
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (e) {
            response.status(401).send({ 'error': 'Invalid credentials' })
        }
    }
}

export default AuthController
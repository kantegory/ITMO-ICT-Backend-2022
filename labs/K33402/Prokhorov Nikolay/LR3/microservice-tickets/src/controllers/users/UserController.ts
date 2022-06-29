import UserService from '../../services/users/UserService'
import jwt from 'jsonwebtoken'
import { jwtOptions } from '../../middlewares/passport'
import RefreshTokenService from '../../services/auth/RefreshToken'
import express from 'express'
import useSafeHandler from '../../composables/useSafeHandler'

export default class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    get = async (request: express.Request, response: express.Response) =>
        useSafeHandler(
            request,
            response,
            async () => {
                const user = await this.userService.getById(
                    Number(request.params.id)
                )
                response.send(user)
            },
            404
        )

    post = async (request: express.Request, response: express.Response) =>
        useSafeHandler(
            request,
            response,
            async () => {
                const { body } = request
                const user = await this.userService.create(body)
                response.status(201).send(user)
            },
            400
        )

    me = async (request: express.Request, response: express.Response) => {
        response.send(request.user)
    }

    auth = async (request: express.Request, response: express.Response) =>
        useSafeHandler(
            request,
            response,
            async () => {
                const { body } = request
                const { email, password } = body

                const { user, checkPassword } =
                    await this.userService.checkPassword(email, password)

                if (checkPassword) {
                    const payload = { id: user.id }
                    const accessToken = jwt.sign(
                        payload,
                        jwtOptions.secretOrKey
                    )

                    const refreshTokenService = new RefreshTokenService(user)
                    const refreshToken =
                        await refreshTokenService.generateRefreshToken()

                    response.send({ accessToken, refreshToken })
                } else {
                    throw new Error('Login or password is incorrect!')
                }
            },
            401
        )

    refreshToken = async (request: express.Request, response: any) =>
        useSafeHandler(
            request,
            response,
            async () => {
                const { body } = request
                const { refreshToken } = body
                const refreshTokenService = new RefreshTokenService()

                const { userId, isExpired } =
                    await refreshTokenService.isRefreshTokenExpired(
                        refreshToken
                    )

                if (!isExpired && userId) {
                    const user = await this.userService.getById(userId)
                    const payload = { id: user.id }
                    const accessToken = jwt.sign(
                        payload,
                        jwtOptions.secretOrKey
                    )

                    const refreshTokenService = new RefreshTokenService(user)
                    const refreshToken =
                        await refreshTokenService.generateRefreshToken()

                    response.send({ accessToken, refreshToken })
                } else {
                    throw new Error('Invalid credentials')
                }
            },
            401
        )
}

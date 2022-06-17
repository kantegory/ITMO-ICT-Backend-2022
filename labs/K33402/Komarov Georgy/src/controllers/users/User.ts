import User from '../../models/users/User'
import UserService from '../../services/users/User'
import UserError from '../../errors/users/User'
import jwt from 'jsonwebtoken'
import { jwtOptions } from '../../middlewares/passport'
import RefreshTokenService from '../../services/auth/RefreshToken'
import { Request, Response } from 'express'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    retrieve = async (request: Request, response: Response) => {
        /*
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/User' },
            }
            #swagger.security = [{
               "bearerAuth": []
            }]
            #swagger.tags = ['Users']
            #swagger.summary = Получить данные пользователя
            #swagger.description = Только для админов
        */

        try {
            const user: User | UserError = await this.userService.getById(Number(request.params.id))

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ error: error.message })
        }
    }

    create = async (request: Request, response: Response) => {
        /*
            #swagger.requestBody = {
                required: true,
                schema: { $ref: "#/definitions/UserCreate" }
            }
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/User' },
            }
            #swagger.tags = ['Users']
            #swagger.summary = Регистрация пользователя
        */

        const { body } = request

        try {
            const user: User | UserError = await this.userService.create(body)

            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ error: error.message })
        }
    }

    me = async (request: Request, response: Response) => {
        /*
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/User' },
            }
            #swagger.security = [{
               "bearerAuth": []
            }]
            #swagger.tags = ['Users']
            #swagger.summary = Мой профиль
        */

        response.send(request.user)
    }

    login = async (request: Request, response: Response) => {
        /*
            #swagger.requestBody = {
                required: true,
                schema: { $ref: "#/definitions/UserLogin" }
            }
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/AuthTokens' },
            }
            #swagger.tags = ['Users']
            #swagger.summary = Авторизация пользователя
        */

        const { body } = request

        const { email, password } = body

        try {
            const { user, checkPassword } = await this.userService.checkPassword(email, password)

            if (checkPassword) {
                const accessToken = jwt.sign(user, jwtOptions.secretOrKey)

                const refreshTokenService = new RefreshTokenService(user)

                const refreshToken = await refreshTokenService.generateRefreshToken()

                response.send({ accessToken, refreshToken })
            } else {
                throw new Error('Login or password is incorrect!')
            }
        } catch (e: any) {
            response.status(401).send({ error: e.message })
        }
    }

    refreshToken = async (request: Request, response: Response) => {
        /*
            #swagger.requestBody = {
                required: true,
                schema: { $ref: "#/definitions/RefreshToken" }
            }
            #swagger.responses[200] = {
                description: 'OK',
                schema: { $ref: '#/definitions/AuthTokens' },
            }
            #swagger.tags = ['Users']
            #swagger.summary = Обновить токены
        */

        const { body } = request

        const { refreshToken } = body

        const refreshTokenService = new RefreshTokenService()

        try {
            const { userId, isExpired } = await refreshTokenService.isRefreshTokenExpired(refreshToken)

            if (!isExpired && userId) {
                const user = await this.userService.getById(userId)

                const payload = { id: user.id }

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

                const refreshTokenService = new RefreshTokenService(user)

                const refreshToken = await refreshTokenService.generateRefreshToken()

                response.send({ accessToken, refreshToken })
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (e) {
            response.status(401).send({ error: 'Invalid credentials' })
        }
    }
}

export default UserController

import passport from 'src/middlewares/passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from '../services/users/User'
import { config } from '../configs/config'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.secret as string,
    jsonWebTokenOptions: {
        maxAge: `${config.auth.accessTokenLifetime}ms`,
    },
}

const customJwtStrategy = new JwtStrategy(opts, async function (jwt_payload, next) {
    const userService = new UserService()

    const user = await userService.getById(jwt_payload.id)

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use(customJwtStrategy)

export { opts as jwtOptions }

export default passport

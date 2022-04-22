import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { json } from 'stream/consumers'
import UserService from '../services/User/index'
const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret',
    JsonWebTokenOptions: {
        maxAge: "60seconds"
    }
}

const customJwtStrategy = new JwtStrategy(opts, async function(jwt_payload, next) {
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

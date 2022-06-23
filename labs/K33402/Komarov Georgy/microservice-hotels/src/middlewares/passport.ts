import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { config } from '../configs/config'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.auth.secret as string,
    jsonWebTokenOptions: {
        maxAge: `${config.auth.accessTokenLifetime}ms`,
    },
}

const customJwtStrategy = new JwtStrategy(opts, async function (jwt_payload, next) {
    next(null, jwt_payload)
})

passport.use(customJwtStrategy)

export { opts as jwtOptions }

export default passport

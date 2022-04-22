import passport from "passport"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import UserService from "../services/users";

let secretKey = "sheeeesh"
secretKey ??= 'secret_key'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
    jsonWebTokenOptions: {
        maxAge: "30m"
    }
}

const customJwtStrategy = new JwtStrategy(opts, async function(jwt_payload, next) {
    const userService = new UserService()

    const user = await userService.getByUsername(jwt_payload.username)

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use(customJwtStrategy)

export { opts as jwtOptions }

export default passport
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import configParser from "../utils/configParser";
import path from "path";

const configPath = path.resolve(__dirname, '../configs/settings.ini')
const config: any = configParser(configPath, 'JWT')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    jsonWebTokenOptions: {
        maxAge: `${config.accessTokenLifetime}ms`,
    },
}

const customJwtStrategy = new JwtStrategy(opts, async function (
    jwt_payload,
    next
) {
    next(null, jwt_payload)
})

passport.use(customJwtStrategy)

export { opts as jwtOptions }

export default passport

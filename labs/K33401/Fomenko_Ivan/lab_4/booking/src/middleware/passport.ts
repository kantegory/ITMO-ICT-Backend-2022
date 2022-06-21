import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserService from "../services/user"

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jamesbond',
    jsonWebTokenOptions: {
        maxAge: `300000ms`
    }
}

const customStrategy = new JwtStrategy(jwtOptions, async function (jwt_payload:any, next: any) {
    const service = new UserService()

    const usero = await service.getById(jwt_payload.id)

    if (usero) {
        next(null, usero)
      } else {
        next(null, false)
      }
    
})

export default customStrategy




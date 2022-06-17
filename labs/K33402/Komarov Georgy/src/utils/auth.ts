import passport from '../middlewares/passport'
import { NextFunction, Request, Response } from 'express'
import User from '../models/users/User'

const isAuthenticated = passport.authenticate('jwt', { session: false })

function isAdmin(request: Request, response: Response, next: NextFunction) {
    const user = request.user as User
    if (user?.isAdmin) {
        next()
    } else {
        response.status(403).send({ error: 'You do not have permission!' })
    }
}

export { isAuthenticated, isAdmin }

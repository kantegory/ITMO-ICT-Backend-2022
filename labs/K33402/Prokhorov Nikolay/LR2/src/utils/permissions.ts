import passport from '../middlewares/passport'

export const isLogged = passport.authenticate('jwt', { session: false })

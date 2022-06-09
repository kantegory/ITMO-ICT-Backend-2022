import passport from '../middlewares/passport'

const isAuthenticated = passport.authenticate('jwt', { session: false })

export { isAuthenticated }

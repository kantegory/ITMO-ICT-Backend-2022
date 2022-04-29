import jwt from "jsonwebtoken"
import UserService from "../services/UserService"
import type { Request, Response, NextFunction } from "express"

const cookieParser = (req: Request, res: Response, next: NextFunction) => {
  const { headers: { cookie } } = req
  req.cookies = cookie?.split(";")
    ?.reduce((a: { [key: string]: string }, cookie: string) => {
      const [k, v] = cookie.trim().split("=")
      return { ...a, [k]: v }
    }, {}) || {}
  return next()
}

const cookieAuther = (req: Request, res: Response, next: NextFunction) => {
  const parts = req.path.split("/")
  const target = parts[parts.length - 1]
  if (target === "bundle.js" || target === "auth" || req.method === "POST" && target === "user")) {
    return next()
  }
  const token = req.cookies?.jwt
  const redirect = () => res.redirect(req.method === "GET" ? 302 : 307, "/auth")
  if (!token) {
    return redirect()
  }
  return jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      console.log(err)
      return redirect()
    }
    return (new UserService()).get(user.id).then(user => {
      res.locals.user = user
      return next()
    }).catch(e => {
      console.error(e)
      return redirect()
    })
  })
}

export { cookieParser, cookieAuther }

import AppError, { handleGenericError } from "../errors"
import UserService from "../services/UserService"
import type { UserShape } from "../models/User"
import type { Request, Response } from "express"

type ResponseOrError<T> = Response<T | AppError>
type JwtResponse = { jwt: string, jwtExpires: Date }

class UserController {
  private userService: UserService

  public constructor() {
    this.userService = new UserService()
  }

  public get = (req: Request, res: ResponseOrError<UserShape>) => {
    const { id } = req.params
    this.userService
      .get(Number(id))
      .then(user => res.status(200).send(user))
      .catch(e => handleGenericError(res, e))
  }

  public post = (req: Request, res: ResponseOrError<JwtResponse>) => {
    const { user }: { user: UserShape } = req.body
    this.userService
      .create(user)
      .then(user => {
        const jwtResponse = this.userService.getJwt(user.id)
        res.status(200).send(jwtResponse)
      })
      .catch(e => handleGenericError(res, e))
  }

  public auth = (req: Request, res: ResponseOrError<JwtResponse>) => {
    const { user }: { user: UserShape } = req.body
    this.userService
      .auth(user)
      .then(jwtResponse => res.status(200).send(jwtResponse))
      .catch(e => handleGenericError(res, e))
  }

  public whoAmI = (req: Request, res: Response) => {
    const { user } = res.locals
    delete user.password
    res.status(200).send(user)
  }
}

export default UserController
export type { JwtResponse }

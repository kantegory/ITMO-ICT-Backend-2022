import type { UserShape } from "../models/User"
import type { Request, Response } from "express"
import AppError, { handleGenericError } from "../errors"
import UserService from "../services/UserService"

type ResponseOrError<T> = Response<T | AppError>

class UserController {
  private userService: UserService

  public constructor() {
    this.userService = new UserService()
  }

  public get = async (req: Request, res: ResponseOrError<UserShape>) => {
    const { id } = req.params
    this.userService
      .get(Number(id))
      .then(user => res.status(200).send(user))
      .catch(e => handleGenericError(res, e))
  }

  public post = async (req: Request, res: ResponseOrError<UserShape>) => {
    const { user } = req.body
    this.userService
      .create(user as UserShape)
      .then(user => res.status(200).send(user))
      .catch(e => handleGenericError(res, e))
  }
}

export default UserController

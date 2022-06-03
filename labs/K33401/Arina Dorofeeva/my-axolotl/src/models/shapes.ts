import AppError from "../errors"
import type { Response } from "express"

export type PostShape = {
  id?: number
  title: string
  text?: string
  link?: string
  favorite?: boolean
}

export type UserShape = {
  id?: number
  username: string
  password: string
}

export type JwtResponse = { jwt: string, jwtExpires: Date }

export type ResponseOrError<T> = Response<T | AppError>

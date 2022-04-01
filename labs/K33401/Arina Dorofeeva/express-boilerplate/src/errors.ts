import type { Response } from "express"

type Error400 = {
  error: Error
}

type AppError = Error400

const handleGenericError = (res: Response, e: Error) => res.status(400).send({
  error: e
})

export { handleGenericError, Error400 }
export default AppError

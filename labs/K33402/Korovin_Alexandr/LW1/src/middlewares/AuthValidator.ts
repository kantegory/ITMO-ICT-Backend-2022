import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validate = [
  check("username").isString(),
  check("password").isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).send({ errors: error.array() });
    }
    return next();
  },
];

export default validate;

import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User";
import Logging from "../library/Logging";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    }),
    update: Joi.object<IUser>({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    }),
    login: Joi.object<IUser>({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    }),
  },
};

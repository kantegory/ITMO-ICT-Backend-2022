import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express"
import { IBooking } from "../models/Booking";
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
  booking: {
    create: Joi.object<IBooking>({
      checkIn: Joi.date().greater("now").required(),
      checkOut: Joi.date().greater(Joi.ref("from")).required(),
    }),
    update: Joi.object<IBooking>({
      checkIn: Joi.date().greater("now").required(),
      checkOut: Joi.date().greater(Joi.ref("from")).required(),
    }),
  },
};

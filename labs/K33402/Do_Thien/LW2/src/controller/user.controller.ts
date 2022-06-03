import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    log.error((e as Error).message);
    return res.status(409).send((e as Error).message);
  }
}

// export async function getUserHandler(req: Request, res: Response) {
//   const userId = get(req, "user._id");

//   const sessions = await findSessions({ user: userId, valid: true });

//   return res.send(sessions);
// }
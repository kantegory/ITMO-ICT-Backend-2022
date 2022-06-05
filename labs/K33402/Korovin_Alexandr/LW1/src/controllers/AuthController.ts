import { Request, Response } from "express";
import Authentication from "../helpers/Authentication";
const db = require("../db/models");

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    const { username } = req.body;
    const password = await Authentication.passwordHash(req.body.password);
    const createUser = await db.user.create({ username, password });
    return res.status(201).send(createUser);
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    const findUser = await db.user.findOne({ where: { username } });

    const compare = await Authentication.passwordCompare(
      password,
      findUser.password
    );

    if (compare) {
      const token = await Authentication.generateToken(
        findUser.id,
        username,
        password
      );
      console.log(token);
      return res.status(200).send({ token });
    }
    return res.status(403).send("Auth Failed");
  };
}

export default new AuthController();

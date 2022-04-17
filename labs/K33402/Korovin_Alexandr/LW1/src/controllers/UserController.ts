import { Request, Response } from "express";
import IController from "./ControllerInterface";
import UserService from "../services/UserService";
class UserController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    const service: UserService = new UserService(req);
    const users = await service.getAll();

    return res.status(200).send(users);
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const service: UserService = new UserService(req);
    const user = await service.getOne();

    return res.status(200).send(user);
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const service: UserService = new UserService(req);
    const user = await service.delete();

    return res.status(200).send({ status: "succes", data: user });
  };
}

export default new UserController();
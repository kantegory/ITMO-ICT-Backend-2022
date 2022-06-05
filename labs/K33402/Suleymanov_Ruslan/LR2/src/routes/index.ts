import { Router } from "express";
import auth from "./auth";
import user from "./user";
import room from "./room";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/room", room);

export default routes;
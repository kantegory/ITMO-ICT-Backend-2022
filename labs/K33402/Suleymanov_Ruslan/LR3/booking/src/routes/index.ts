import { Router } from "express";
import roomUserId from "./roomUserId";

const routes = Router();

routes.use("/", roomUserId);

export default routes;
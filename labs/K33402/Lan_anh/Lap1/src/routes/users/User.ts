import express from "express";
import UserController from "../../controllers/users/User";

const router: express.Router = express.Router();

const controller: UserController = new UserController();

router.route("/:id").get(controller.get).put(controller.put).delete(controller.delete);

router.route("/").post(controller.post);

export default router;

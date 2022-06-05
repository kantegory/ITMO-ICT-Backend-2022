import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//Login route
router.post("/login", AuthController.login);

//Create a new user
router.post("/registration", AuthController.registration);

//Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;
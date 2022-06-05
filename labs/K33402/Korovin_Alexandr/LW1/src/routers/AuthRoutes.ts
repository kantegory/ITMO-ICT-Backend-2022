import BaseRoutes from "./BaseRoutes";
import validate from "../middlewares/AuthValidator";

//Controller
import AuthController from "../controllers/AuthController";

class UserRouter extends BaseRoutes {
  public routes(): void {
    this.router.post("/register", validate, AuthController.register);
    this.router.post("/login", validate, AuthController.login);
  }
}

export default new UserRouter().router;

import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();
const controller: UserController = new UserController()

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/get/:hotelId", controller.get);
router.get("/get/", controller.getList);
router.patch("/update/:hotelId", controller.update);
router.delete("/delete/:hotelId", controller.delete);

export = router;

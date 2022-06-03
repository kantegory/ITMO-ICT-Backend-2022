import express, { Router } from "express";
import TicketController from "../controller/Ticket";
import auth from "../middleware/Auth";

const router: express.Router = express.Router()
const controller = new TicketController

router.route("/tickets/:id").post(auth, controller.buy)
router.route("/tickets").get(auth, controller.getAll)

export default router
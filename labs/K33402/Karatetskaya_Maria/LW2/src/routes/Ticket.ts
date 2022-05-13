import express, { Router } from "express";
import TicketController from "../controllers/Ticket";

const router: express.Router = express.Router()
const controller = new TicketController

router.route("/flights/:id/tickets").post(controller.buy)

export default router
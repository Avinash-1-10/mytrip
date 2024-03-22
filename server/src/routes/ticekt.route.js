import express from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import { getAllTickets, getTicket } from "../controllers/ticket.controller.js";

const ticketRouter = express.Router();

ticketRouter.get("/", getAllTickets);
ticketRouter.get("/:ticketId", getTicket);

export default ticketRouter;

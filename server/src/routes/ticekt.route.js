import express from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import { getAllTickets, getTicket, getUserTickets } from "../controllers/ticket.controller.js";

const ticketRouter = express.Router();

ticketRouter.get("/", getAllTickets);
ticketRouter.get("/:ticketId", getTicket);
ticketRouter.get("/user/:userId", verifyJwt, getUserTickets)

export default ticketRouter;

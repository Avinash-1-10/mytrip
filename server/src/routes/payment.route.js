import express from "express";
import { checkout, getKey, verifyPayment } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/checkout", checkout);
paymentRouter.post("/verification", verifyPayment);
paymentRouter.get("/key", getKey)

export default paymentRouter;
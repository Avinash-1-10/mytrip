import express from "express";
import { checkout, getKey, verifyPayment } from "../controllers/payment.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/checkout",verifyJwt, checkout);
paymentRouter.post("/verification", verifyPayment);
paymentRouter.get("/key", getKey)

export default paymentRouter;
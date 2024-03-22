import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import userRouter from "./routes/user.route.js";
import cityRouter from "./routes/city.route.js";
import cookieParser from "cookie-parser";
import busRouter from "./routes/bus.route.js";
import tripRouter from "./routes/trip.route.js";
import paymentRouter from "./routes/payment.route.js";
import ticketRouter from "./routes/ticekt.route.js";

dotenv.config();


const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/city", cityRouter);
app.use("/api/v1/bus", busRouter);
app.use("/api/v1/trip", tripRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/ticket", ticketRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

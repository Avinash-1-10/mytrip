import express from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";
import { createBus, getBus } from "../controllers/bus.contoller.js";

const busRouter = express.Router();

busRouter.post("/", verifyJwt, upload.single("image"), createBus );
busRouter.get("/", getBus);

export default busRouter;
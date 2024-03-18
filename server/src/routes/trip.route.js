import express from "express";
import verifyJwt from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js";
import { createTrip, getTrips } from "../controllers/trip.controller.js";

const tripRouter = express.Router();

tripRouter.post("/", verifyJwt, upload.single("image"), createTrip);
tripRouter.get("/", getTrips)

export default tripRouter;
import express from "express";
import { addCity, getAllCities } from "../controllers/city.controller.js";

const cityRouter = express.Router();

cityRouter.get("/allcities", getAllCities);
cityRouter.post("/add", addCity)


export default cityRouter;


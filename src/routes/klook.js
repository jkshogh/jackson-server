import express from "express";
import { getFares, getPlaces } from "../controllers/klook.controller.js";

const router = express.Router();

router.get("/fares", getFares);
router.get("/places", getPlaces);

export default router;
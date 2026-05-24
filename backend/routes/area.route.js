import express from "express";
import {
  generateAreasWithAI,
  getAllAreas, // Import this
} from "../controllers/area.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

// Generate Areas (Mayor Only)
router.post(
  "/ai-generate",
  isAuthenticated,
  isAuthorized("mayor"),
  generateAreasWithAI
);

// Get All Areas
router.get("/all", getAllAreas);

export default router;

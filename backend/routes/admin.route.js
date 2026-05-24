import express from "express";
import {
  downloadAssignmentTemplate,
  uploadFilledAssignments,
} from "../controllers/admin.controller.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

// 1. GET route to download the blank (but structured) CSV
router.get(
  "/template/download",
  isAuthenticated,
  isAuthorized("mayor"),
  downloadAssignmentTemplate
);

// 2. POST route to upload the filled CSV
router.post(
  "/assignments/upload",
  isAuthenticated,
  isAuthorized("mayor"),
  // Note: No middleware needed here because express-fileupload is global in app.js
  uploadFilledAssignments
);

export default router;

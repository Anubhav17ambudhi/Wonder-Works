import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  assignComplaint,
} from "../controllers/complaint.controller.js";



const router = express.Router();

router.post("/fileComplaint", isAuthenticated, createComplaint);
router.get("/getAllComplaints", isAuthenticated, getAllComplaints);
router.get("/getComplaintById/:id", isAuthenticated, getComplaintById);
router.put("/assignComplaint/:id", isAuthenticated, isAuthorized("mayor"), assignComplaint);

export default router;
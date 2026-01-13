import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  createComplaint,
  getNewComplaints,
  // getComplaintById,
  assignmentofComplaintbySuperVisor,
  complainResolvedBySuperVisor,
} from "../controllers/complaint.controller.js";



const router = express.Router();

router.post("/fileComplaint", createComplaint);
router.get("/getNewComplaints", isAuthenticated, getNewComplaints);
// router.get("/getComplaintById/:id", isAuthenticated, getComplaintById);
router.put(
  "/assignComplaint/:id",
  isAuthenticated,
  assignmentofComplaintbySuperVisor
);
router.put(
  "/complainResolvedBySuperVisor/:id",
  isAuthenticated,
  complainResolvedBySuperVisor
);

export default router;
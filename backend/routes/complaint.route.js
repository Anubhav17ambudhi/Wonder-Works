import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  createComplaint,
  getNewComplaints,
  getEscalatedComplaints,
  assignmentofComplaintbySuperVisor,
  complainResolvedBySuperVisor,
  escalatedComplainResolvedByMayor,
  getComplaintByAreaandLocality,
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
router.put(
  "/escalatedComplainResolvedByMayor/:id",
  isAuthenticated,
  isAuthorized("mayor"),
  escalatedComplainResolvedByMayor
);

router.get(
  "/getComplaintByAreaandLocality",
  isAuthenticated,
  isAuthorized("mayor"),
  getComplaintByAreaandLocality
);
router.get(
  "/getEscalatedComplaints",
  isAuthenticated,
  isAuthorized("mayor"),
  getEscalatedComplaints
);

export default router;
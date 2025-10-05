import express from "express";
import {
  login,
  register,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
// router.post("/verify-otp", verifyOTP); // Assuming verifyOTP is also handled by the register function for simplicity
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticated, updatePassword);

export default router;

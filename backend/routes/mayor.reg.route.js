import express from "express";
import { registerMayor } from "../controllers/mayor.reg.controller.js";

const router = express.Router();

router.post("/register-mayor", registerMayor);

export default router;

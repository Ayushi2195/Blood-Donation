import express from "express";
import { updateDonorStatus } from "../controllers/donorController.js";
import { findDonors } from "../controllers/donorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/update", authMiddleware, updateDonorStatus);
router.get("/find", authMiddleware, findDonors);

export default router;
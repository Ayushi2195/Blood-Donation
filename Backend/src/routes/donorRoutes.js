import express from "express";
import { updateDonorStatus } from "../controllers/donorController.js";
import { getAllDonors } from "../controllers/donorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/update", authMiddleware, updateDonorStatus);
router.get("/list", authMiddleware, getAllDonors);

export default router;
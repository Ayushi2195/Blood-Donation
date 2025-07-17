// routes/notificationRoutes.js
import express from "express";
import {
  sendPatientRequest,
  donorResponse,
  sendEmergencyRequest,
  getUserNotifications,
} from "../controllers/notificationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/request", authMiddleware, sendPatientRequest);
router.patch("/response/:notificationId", authMiddleware, donorResponse);
router.post("/emergency", authMiddleware, sendEmergencyRequest);
router.get("/my", authMiddleware, getUserNotifications);

export default router;

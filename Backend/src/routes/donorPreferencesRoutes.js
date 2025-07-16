import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { setUserPreferences, getUserPreferences } from "../controllers/userController.js";

const router = express.Router();

router.patch("/preferences", authMiddleware, setUserPreferences);
router.get("/preferences", authMiddleware, getUserPreferences);

export default router;
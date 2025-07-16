import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import connectDB from './config/db.js'; 

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import donorRoutes from './routes/donorRoutes.js';
import donorPreferencesRoutes from './routes/donorPreferencesRoutes.js';
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
console.log("MONGO URL:", process.env.MONGO_URL);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5001;

const FRONTEND_ORIGIN = "http://localhost:5173";

// Middlewares
app.use(express.json());
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

// Routes
app.get("/", (req, res) => res.send("API running..."));
app.use("/api/auth", authRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/user", userRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/donor", donorPreferencesRoutes);
app.use("/api/notifications", notificationRoutes);

// Start server after DB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});


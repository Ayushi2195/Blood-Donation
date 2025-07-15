import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';

import connectDB from './config/db.js'; 

import authRoutes from "./routes/authRoutes.js";
import { authenticateToken } from "./middleware/authenticateToken.js";
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
console.log("MONGO URI:", process.env.MONGO_URI);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5001;

const FRONTEND_ORIGIN = "http://localhost:5173";

// Middlewares
app.use(express.json());
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ["GET", "POST", "PATCH"],
  credentials: true
}));

// Routes
app.get("/", (req, res) => res.send("API running..."));
app.use("/api/auth", authRoutes);
app.use('/api/contact', contactRoutes);

// Start server after DB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

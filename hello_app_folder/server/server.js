import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables from .env
dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Initialize Express
const app = express();
app.use(express.json()); // Parse JSON bodies

// Simple hello endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the API!" });
});


// Simple time endpoint
app.get("/api/time", (req, res) => {
  res.json({ time: new Date().toLocaleTimeString() });
});

// ⚡ attach user routes
app.use("/api/user", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

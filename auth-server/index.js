import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// Load environment variables from the .env file
const app = express();
app.use(express.json());

dotenv.config();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

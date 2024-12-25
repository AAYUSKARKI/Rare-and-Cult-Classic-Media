import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import mediaRoutes from "./routes/media.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CORRS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// MongoDB Connection
await mongoose.connect(process.env.MONGODB_URI,{dbName:"media"})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/v1/media", mediaRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





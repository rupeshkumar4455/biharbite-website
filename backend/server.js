import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

/* ===============================
   ROUTES
   =============================== */
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import riderRoutes from "./routes/riderRoutes.js"; // 🔥 RIDER

dotenv.config();

const app = express();

/* ===============================
   🌐 CORS (RENDER + VERCEL)
   =============================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://biharbite-website.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

/* ===============================
   MIDDLEWARE
   =============================== */
app.use(express.json());

/* ===============================
   API ROUTES
   =============================== */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/rider", riderRoutes); // 🔥 MUST EXIST



 



/* ===============================
   ROOT CHECK
   =============================== */
app.get("/", (req, res) => {
  res.send("🚀 BiharBite Backend Running");
});

/* ===============================
   DB + SERVER
   =============================== */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
  });

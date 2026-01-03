import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

/* ===============================
   🌐 CORS (FINAL BULLETPROOF FIX)
   =============================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🔥 IMPORTANT: handle preflight explicitly
app.options("*", cors());

/* ===============================
   MIDDLEWARE
   =============================== */
app.use(express.json());

/* ===============================
   ROUTES
   =============================== */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

/* ===============================
   ROOT TEST
   =============================== */
app.get("/", (req, res) => {
  res.status(200).send("🚀 BiharBite Backend Running");
});

/* ===============================
   DATABASE + SERVER
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
    console.error("❌ MongoDB error:", err);
  });

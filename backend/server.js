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
   🌐 CORS (FINAL & PERMANENT FIX)
   =============================== */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


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
   ROOT TEST ROUTE
   =============================== */
app.get("/", (req, res) => {
  res.send("🚀 BiharBite Backend Running");
});

/* ===============================
   DATABASE + SERVER START
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
    console.error("❌ MongoDB connection error:", err);
  });

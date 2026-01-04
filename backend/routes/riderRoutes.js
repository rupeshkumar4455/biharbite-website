import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Rider from "../models/Rider.js";

const router = express.Router();

/* ===============================
   TOKEN GENERATOR
   =============================== */
const generateToken = (id) => {
  return jwt.sign(
    { id, role: "rider" },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

/* ===============================
   RIDER LOGIN
   =============================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const rider = await Rider.findOne({ email, isActive: true });
    if (!rider) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, rider.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: rider._id,
      name: rider.name,
      email: rider.email,
      token: generateToken(rider._id),
    });
  } catch (error) {
    console.error("RIDER LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===============================
   GET ALL RIDERS (ADMIN)
   =============================== */
router.get("/all", async (req, res) => {
  try {
    const riders = await Rider.find({ isActive: true }).select(
      "_id name email"
    );
    res.json(riders);
  } catch (error) {
    console.error("FETCH RIDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch riders" });
  }
});

export default router;

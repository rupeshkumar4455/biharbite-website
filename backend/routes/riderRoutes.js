import express from "express";
import bcrypt from "bcrypt"; // ✅ bcrypt (NOT bcryptjs)
import jwt from "jsonwebtoken";
import Rider from "../models/Rider.js";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign(
    { id, role: "rider" },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const rider = await Rider.findOne({ email });
    if (!rider) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, rider.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!rider.isActive) {
      return res.status(403).json({ message: "Rider inactive" });
    }

    res.json({
      rider: {
        _id: rider._id,
        name: rider.name,
        email: rider.email,
      },
      token: generateToken(rider._id),
    });
  } catch (err) {
    console.error("RIDER LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

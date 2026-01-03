import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const generateToken = (id, isAdmin) => {
  return jwt.sign(
    { id, isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

/* ===============================
   REGISTER (USER ONLY)
   =============================== */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      isAdmin: false,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: false,
      token: generateToken(user._id, false),
    });
  } catch (err) {
    res.status(500).json({ message: "Register failed" });
  }
});

/* ===============================
   LOGIN (USER + ADMIN)
   =============================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔐 ADMIN LOGIN — FINAL & HARD-CODED
    if (email === "admin" && password === "admin123") {
      return res.json({
        _id: "admin",
        name: "Admin",
        email: "admin",
        isAdmin: true,
        token: generateToken("admin", true),
      });
    }

    // 👤 USER LOGIN
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: false,
      token: generateToken(user._id, false),
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;

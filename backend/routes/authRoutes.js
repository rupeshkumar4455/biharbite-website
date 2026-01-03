import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign(
    { id, isAdmin: false },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

/* ===============================
   REGISTER (USER)
   =============================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password, // 🔐 auto-hashed by model
      isAdmin: false,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===============================
   LOGIN (USER)
   =============================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let isMatch = false;

    // 🔐 CASE 1: hashed password
    if (user.password.startsWith("$2")) {
      isMatch = await bcrypt.compare(password, user.password);
    } 
    // ⚠️ CASE 2: old plain-text password (AUTO FIX)
    else {
      isMatch = password === user.password;

      if (isMatch) {
        user.password = password; // will auto-hash on save
        await user.save();
      }
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

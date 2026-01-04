import express from "express";
import bcrypt from "bcrypt"; // ✅ FIXED (bcryptjs ❌)
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* ===============================
   TOKEN GENERATOR
   =============================== */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "user",
      },
      token: generateToken(user._id, "user"),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===============================
   LOGIN (USER + ADMIN)
   =============================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    /* 🔐 ADMIN LOGIN */
    if (email === "admin" && password === "admin123") {
      return res.json({
        user: {
          _id: "admin",
          name: "Admin",
          email: "admin",
          role: "admin",
        },
        token: generateToken("admin", "admin"),
      });
    }

    /* 👤 USER LOGIN */
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "user",
      },
      token: generateToken(user._id, "user"),
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

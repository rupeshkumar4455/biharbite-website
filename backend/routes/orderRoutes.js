import express from "express";
import Order from "../models/Order.js";
import protect, { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
   CREATE ORDER (USER)
   =============================== */
router.post("/", protect, async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Placed",
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order create failed" });
  }
});

/* ===============================
   USER: MY ORDERS
   =============================== */
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
});

/* ===============================
   ADMIN: ALL ORDERS
   =============================== */
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin orders" });
  }
});

export default router;

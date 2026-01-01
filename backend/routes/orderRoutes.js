import express from "express";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* USER: CREATE ORDER */
router.post("/", protect, async (req, res) => {
  const { items, totalAmount, paymentMethod } = req.body;

  const order = await Order.create({
    user: req.user._id,
    items,
    totalAmount,
    paymentMethod,
  });

  res.status(201).json(order);
});

/* USER: MY ORDERS */
router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

/* ADMIN: ALL ORDERS */
router.get("/", protect, adminOnly, async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
});

/* ADMIN: UPDATE STATUS */
router.put("/:id", protect, adminOnly, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Order not found" });

  order.orderStatus = req.body.orderStatus || order.orderStatus;
  order.paymentStatus = req.body.paymentStatus || order.paymentStatus;

  const updated = await order.save();
  res.json(updated);
});

export default router;

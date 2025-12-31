import express from "express";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
========================================
POST /api/orders
Create new order (USER)
========================================
*/
router.post("/", protect, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, status } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      paymentMethod,
      status: status || "Pending",
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
========================================
GET /api/orders/my
Get logged-in user's orders
========================================
*/
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
========================================
GET /api/orders
Get all orders (ADMIN)
========================================
*/
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
========================================
PUT /api/orders/:id
Update order status (ADMIN)
========================================
*/
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

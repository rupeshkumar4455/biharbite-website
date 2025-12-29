import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      items,
      total,
      paymentMethod,
      status: "Pending",
    });

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// UPDATE STATUS
router.put("/:id", async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
  });
  res.json({ success: true });
});

export default router;

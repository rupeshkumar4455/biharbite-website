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
      orderStatus: "Placed",
      deliveryStatus: "Assigned",
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order create failed" });
  }
});

/* ===============================
   GET ALL ORDERS (ADMIN)
   =============================== */
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("rider", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Fetch orders failed" });
  }
});

/* ===============================
   UPDATE ORDER STATUS (ADMIN)
   =============================== */
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.orderStatus = req.body.status;
    await order.save();
    res.json(order);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
});

/* ===============================
   ASSIGN RIDER (ADMIN)
   =============================== */
router.put("/:id/assign-rider", protect, adminOnly, async (req, res) => {
  try {
    const { riderId } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.rider = riderId;
    order.deliveryStatus = "Assigned";
    await order.save();

    res.json({ message: "Rider assigned", order });
  } catch (err) {
    res.status(500).json({ message: "Assign rider failed" });
  }
});

/* ===============================
   DELETE ORDER (ADMIN)
   =============================== */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;

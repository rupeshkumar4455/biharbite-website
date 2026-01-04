import express from "express";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
   👤 USER: CREATE ORDER
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

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* ===============================
   👤 USER: MY ORDERS  🔥 REQUIRED
   =============================== */
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("rider", "name phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ===============================
   🛠️ ADMIN: ALL ORDERS
   =============================== */
router.get("/", async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("rider", "name phone")
    .sort({ createdAt: -1 });

  res.json(orders);
});

/* ===============================
   🛠️ ADMIN: UPDATE STATUS
   =============================== */
router.put("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.orderStatus = req.body.status;
  await order.save();

  res.json(order);
});

/* ===============================
   🛠️ ADMIN: ASSIGN RIDER
   =============================== */
router.put("/:id/assign-rider", async (req, res) => {
  const { riderId } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.rider = riderId;
  order.deliveryStatus = "Assigned";
  await order.save();

  res.json({ message: "Rider assigned" });
});

/* ===============================
   🛠️ ADMIN: DELETE ORDER
   =============================== */
router.delete("/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
});

export default router;

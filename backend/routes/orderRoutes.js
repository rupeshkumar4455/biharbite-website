import express from "express";
import Order from "../models/Order.js";
import protect, { adminOnly } from "../middleware/authMiddleware.js";

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
      paymentStatus: "Pending",
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

/* ===============================
   👤 USER: MY ORDERS
   =============================== */
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("rider", "name phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("MY ORDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ===============================
   🛠️ ADMIN: ALL ORDERS
   =============================== */
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("rider", "name phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("ADMIN FETCH ORDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ===============================
   🛠️ ADMIN: UPDATE ORDER STATUS
   =============================== */
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.orderStatus = req.body.status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Update status failed" });
  }
});

/* ===============================
   🛠️ ADMIN: ASSIGN RIDER
   =============================== */
router.put("/:id/assign-rider", protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.rider = req.body.riderId;
    order.orderStatus = "Out for delivery";

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("rider", "name phone");

    res.json(populatedOrder);
  } catch {
    res.status(500).json({ message: "Assign rider failed" });
  }
});

/* ===============================
   🚴 RIDER: UPDATE LIVE LOCATION
   =============================== */
router.put("/:id/location", protect, async (req, res) => {
  try {
    const { lat, lng } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.riderLocation = { lat, lng };
    await order.save();

    res.json({ message: "Rider location updated" });
  } catch (err) {
    res.status(500).json({ message: "Location update failed" });
  }
});


/* ===============================
   🚴 RIDER: GET ASSIGNED ORDERS
   =============================== */
router.get("/rider", protect, async (req, res) => {
  try {
    // 🛑 ensure rider logged in
    if (!req.user || !req.user.isRider) {
      return res.status(403).json({ message: "Not a rider" });
    }

    const orders = await Order.find({
      rider: req.user._id,
    })
      .populate("user", "name phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("RIDER ORDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch rider orders" });
  }
});


/* ===============================
   🛠️ ADMIN: DELETE ORDER
   =============================== */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;

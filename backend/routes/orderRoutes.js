import express from "express";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
   CREATE ORDER (USER)
   =============================== */
router.post("/", protect, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      paymentMethod,
    } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      paymentMethod,
      orderStatus: "Placed",
      paymentStatus:
        paymentMethod === "COD" ? "Pending" : "Paid",
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Order create failed" });
  }
});

/* ===============================
   GET ALL ORDERS (ADMIN)
   =============================== */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("rider", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("FETCH ORDERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ===============================
   UPDATE ORDER STATUS (ADMIN)
   =============================== */
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.json(order);
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Update failed" });
  }
});

/* ===============================
   ASSIGN RIDER (ADMIN)
   =============================== */
router.put("/:id/assign-rider", async (req, res) => {
  try {
    const { riderId } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found" });
    }

    order.rider = riderId;
    order.orderStatus = "Assigned";

    await order.save();

    res.json(order);
  } catch (error) {
    console.error("ASSIGN RIDER ERROR:", error);
    res.status(500).json({ message: "Assign rider failed" });
  }
});

/* ===============================
   DELETE ORDER (ADMIN)
   =============================== */
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;

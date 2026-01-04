import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Rider from "../models/Rider.js";
import Order from "../models/Order.js";

const router = express.Router();

/* ===============================
   TOKEN
   =============================== */
const generateToken = (id) => {
  return jwt.sign(
    { id, role: "rider" },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

/* ===============================
   TEST ROUTE (DEBUG)
   =============================== */
router.get("/test", (req, res) => {
  res.send("✅ Rider routes working");
});

/* ===============================
   RIDER LOGIN
   =============================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const rider = await Rider.findOne({ email, isActive: true });
    if (!rider) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, rider.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: rider._id,
      name: rider.name,
      email: rider.email,
      token: generateToken(rider._id),
    });
  } catch (err) {
    console.error("RIDER LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===============================
   GET ASSIGNED ORDERS (🔥 THIS WAS MISSING / NOT LOADED)
   =============================== */
router.get("/orders", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "rider") {
      return res.status(403).json({ message: "Not rider" });
    }

    const orders = await Order.find({ rider: decoded.id })
      .populate("user", "name email");

    res.json(orders);
  } catch (err) {
    console.error("RIDER ORDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ===============================
   UPDATE DELIVERY STATUS
   =============================== */
router.put("/orders/:id/status", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "rider") {
      return res.status(403).json({ message: "Not rider" });
    }

    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.rider || order.rider.toString() !== decoded.id) {
      return res.status(403).json({ message: "Not your order" });
    }

    order.deliveryStatus = status;
    if (status === "Delivered") {
      order.orderStatus = "Delivered";
    }

    await order.save();
    res.json(order);
  } catch (err) {
    console.error("RIDER STATUS ERROR:", err);
    res.status(500).json({ message: "Status update failed" });
  }
});

/* ===============================
   📍 UPDATE RIDER LOCATION
   =============================== */
router.put("/orders/:id/location", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "rider") {
      return res.status(403).json({ message: "Not rider" });
    }

    const { lat, lng } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!order.rider || order.rider.toString() !== decoded.id) {
      return res.status(403).json({ message: "Not your order" });
    }

    order.riderLocation = {
      lat,
      lng,
      updatedAt: new Date(),
    };

    await order.save();
    res.json({ message: "Location updated" });
  } catch (err) {
    res.status(500).json({ message: "Location update failed" });
  }
});

export default router;

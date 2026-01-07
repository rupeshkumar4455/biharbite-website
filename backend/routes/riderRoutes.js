import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Rider from "../models/Rider.js";
import Order from "../models/Order.js";
import protect, { riderOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
   🧪 TEST ROUTE
   =============================== */
router.get("/test", (req, res) => {
  res.send("✅ Rider routes working");
});

/* ===============================
   🚴 RIDER LOGIN
   =============================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const rider = await Rider.findOne({ email, isActive: true });
    if (!rider) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, rider.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }



      /* ===============================
   🛠️ ADMIN: GET ALL RIDERS
   =============================== */
router.get("/all", async (req, res) => {
  try {
    const riders = await Rider.find({ isActive: true }).select(
      "name email phone"
    );
    res.json(riders);
  } catch (err) {
    console.error("FETCH RIDERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch riders" });
  }
});



    // ✅ TOKEN WITH ROLE
    const token = jwt.sign(
      { id: rider._id, role: "rider" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      rider: {
        _id: rider._id,
        name: rider.name,
        email: rider.email,
        phone: rider.phone,
      },
    });
  } catch (err) {
    console.error("RIDER LOGIN ERROR:", err);
    res.status(500).json({ message: "Rider login failed" });
  }
});

/* ===============================
   🚴 RIDER: GET ASSIGNED ORDERS
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
      .populate("user", "name phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

/* ===============================
   🚚 UPDATE DELIVERY STATUS
   =============================== */
router.put(
  "/orders/:id/status",
  protect,
  riderOnly,
  async (req, res) => {
    try {
      const { status } = req.body;

      const order = await Order.findById(req.params.id);
      if (!order) {
        return res
          .status(404)
          .json({ message: "Order not found" });
      }

      if (
        !order.rider ||
        order.rider.toString() !== req.user._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: "Not your order" });
      }

      order.deliveryStatus = status;

      if (status === "Delivered") {
        order.orderStatus = "Delivered";
      }

      await order.save();
      res.json(order);
    } catch (err) {
      console.error("RIDER STATUS ERROR:", err);
      res
        .status(500)
        .json({ message: "Status update failed" });
    }
  }
);

/* ===============================
   📍 UPDATE RIDER LOCATION
   =============================== */
router.put(
  "/orders/:id/location",
  protect,
  riderOnly,
  async (req, res) => {
    try {
      const { lat, lng } = req.body;

      const order = await Order.findById(req.params.id);
      if (!order) {
        return res
          .status(404)
          .json({ message: "Order not found" });
      }

      if (
        !order.rider ||
        order.rider.toString() !== req.user._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: "Not your order" });
      }

      order.riderLocation = {
        lat,
        lng,
        updatedAt: new Date(),
      };

      await order.save();
      res.json({ message: "Location updated" });
    } catch (err) {
      console.error("RIDER LOCATION ERROR:", err);
      res
        .status(500)
        .json({ message: "Location update failed" });
    }
  }
);

export default router;

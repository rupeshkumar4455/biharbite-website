import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Rider from "../models/Rider.js";

/* ===============================
   🔐 PROTECT (USER + ADMIN + RIDER)
   =============================== */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      /* ================= ADMIN ================= */
      if (decoded.id === "admin" || decoded.role === "admin") {
        req.user = {
          _id: "admin",
          isAdmin: true,
        };
        return next();
      }

      /* ================= RIDER ================= */
      if (decoded.role === "rider") {
        const rider = await Rider.findById(decoded.id);
        if (!rider) {
          return res
            .status(401)
            .json({ message: "Rider not found" });
        }

        req.user = {
          _id: rider._id,
          name: rider.name,
          isRider: true,
        };
        return next();
      }

      /* ================= USER ================= */
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("AUTH ERROR:", err);
      return res
        .status(401)
        .json({ message: "Not authorized, token failed" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "No token provided" });
  }
};

/* ===============================
   🔒 ADMIN ONLY
   =============================== */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Admin access only" });
  }
};

/* ===============================
   🚴 RIDER ONLY
   =============================== */
const riderOnly = (req, res, next) => {
  if (req.user && req.user.isRider === true) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Rider access only" });
  }
};

export default protect;
export { protect, adminOnly, riderOnly };

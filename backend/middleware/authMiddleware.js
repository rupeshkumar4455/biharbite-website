import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ===============================
   🔐 PROTECT (USER + ADMIN)
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

      // 🔑 ADMIN TOKEN
      if (decoded.id === "admin") {
        req.user = { _id: "admin", isAdmin: true };
        return next();
      }

      // 👤 USER TOKEN
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

/* ===============================
   🔒 ADMIN ONLY
   =============================== */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin only" });
  }
};

/* ===============================
   ✅ EXPORTS (FINAL FIX)
   =============================== */
export default protect;
export { protect, adminOnly };

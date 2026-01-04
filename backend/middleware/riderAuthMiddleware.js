import jwt from "jsonwebtoken";
import Rider from "../models/Rider.js";

const protectRider = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== "rider") {
        return res.status(403).json({ message: "Not a rider" });
      }

      const rider = await Rider.findById(decoded.id).select("-password");

      if (!rider || !rider.isActive) {
        return res.status(401).json({ message: "Rider not authorized" });
      }

      req.rider = rider;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Rider token failed" });
    }
  } else {
    return res.status(401).json({ message: "No rider token" });
  }
};

export default protectRider;

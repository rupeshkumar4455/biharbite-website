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

      const rider = await Rider.findById(decoded.id).select("-password");
      if (!rider) {
        return res.status(401).json({ message: "Rider not found" });
      }

      req.rider = rider;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
  } else {
    return res.status(401).json({ message: "No token" });
  }
};

export default protectRider;

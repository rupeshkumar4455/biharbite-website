import express from "express";

const router = express.Router();

router.get("/orders", (req, res) => {
  res.json({ message: "RIDER ORDERS ROUTE WORKING" });
});

router.get("/all", (req, res) => {
  res.json({ message: "RIDER ALL ROUTE WORKING" });
});

export default router;

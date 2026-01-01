import express from "express";
import Product from "../models/Product.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* 🔓 PUBLIC: GET ALL PRODUCTS */
router.get("/", async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
});

/* 🔐 ADMIN: ADD PRODUCT */
router.post("/", protect, adminOnly, async (req, res) => {
  const { name, price, image, description } = req.body;

  const product = await Product.create({
    name,
    price,
    image,
    description,
  });

  res.status(201).json(product);
});

/* 🔐 ADMIN: UPDATE PRODUCT */
router.put("/:id", protect, adminOnly, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.image = req.body.image || product.image;
  product.description = req.body.description || product.description;

  const updated = await product.save();
  res.json(updated);
});

/* 🔐 ADMIN: DELETE PRODUCT */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.isActive = false;
  await product.save();

  res.json({ message: "Product removed" });
});

export default router;

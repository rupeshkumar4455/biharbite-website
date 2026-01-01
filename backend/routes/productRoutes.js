import express from "express";
import Product from "../models/Product.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===============================
   SEED PRODUCTS (RUN ONCE)
   =============================== */
router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany();

    const products = await Product.insertMany([
      {
        name: "Anarsa",
        price: 299,
        image: "/images/anarsa.jpg",
        description: "Traditional Bihari Anarsa made with rice & jaggery",
        isActive: true,
      },
      {
        name: "Khaja",
        price: 249,
        image: "/images/khaja.jpg",
        description: "Crispy layered authentic Bihari Khaja",
        isActive: true,
      },
      {
        name: "Tilkut",
        price: 199,
        image: "/images/tilkut.jpg",
        description: "Classic Tilkut made with sesame & jaggery",
        isActive: true,
      },
      {
        name: "BiharBite Combo",
        price: 699,
        image: "/images/combo.jpg",
        description: "Anarsa + Khaja + Tilkut combo pack",
        isActive: true,
      },
    ]);

    res.json(products);
  } catch (error) {
    console.error("SEED ERROR:", error);
    res.status(500).json({ message: "Seed failed" });
  }
});

/* ===============================
   PUBLIC: GET PRODUCTS
   =============================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/* ===============================
   ADMIN: ADD PRODUCT
   =============================== */
router.post("/", protect, adminOnly, async (req, res) => {
  const { name, price, image, description } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      image,
      description,
      isActive: true,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Product create failed" });
  }
});

/* ===============================
   ADMIN: DELETE PRODUCT
   =============================== */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isActive = false;
    await product.save();

    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

/* 🔥 THIS IS THE MOST IMPORTANT LINE 🔥 */
export default router;

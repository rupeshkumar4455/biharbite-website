import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      }
    ],
    total: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD"
    },
    status: {
      type: String,
      enum: ["Pending", "Delivered"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

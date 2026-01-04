import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      default: null,
    },

    items: [
      {
        name: String,
        qty: Number,
        price: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    orderStatus: {
      type: String,
      default: "Placed", // Admin/User level
    },

    deliveryStatus: {
      type: String,
      default: "Assigned", // 🚴 Rider level
    },
    riderLocation: {
  lat: Number,
  lng: Number,
  updatedAt: Date,
},
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

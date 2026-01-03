import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const safeCart = Array.isArray(cart) ? cart : [];

  const totalAmount = safeCart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // 🔴 CHANGE THIS TO YOUR REAL UPI ID
  const UPI_ID = "6268947041@ibl";

  // UPI deep link
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=BiharBite&am=${totalAmount}&cu=INR`;

  // 🔥 QR IMAGE (NO REACT COMPONENT)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    upiLink
  )}`;

  const placeOrder = async () => {
    if (!safeCart.length) {
      alert("Cart is empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          items: safeCart,
          totalAmount,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      alert("Order placed successfully");
      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <div className="border p-4 mb-6">
        <p className="font-medium">Total Amount: ₹{totalAmount}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Payment Method</h3>

        <label className="block mb-2">
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />{" "}
          Cash on Delivery
        </label>

        <label className="block">
          <input
            type="radio"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />{" "}
          Pay via UPI
        </label>
      </div>

      {/* 🔥 UPI PAYMENT UI */}
      {paymentMethod === "UPI" && totalAmount > 0 && (
        <div className="mb-6 border p-4 text-center">
          <p className="mb-2">
            UPI ID: <b>{UPI_ID}</b>
          </p>

          <div className="flex justify-center">
            <img
              src={qrImageUrl}
              alt="UPI QR Code"
              className="w-48 h-48"
            />
          </div>

          <p className="text-sm mt-2">Scan & Pay ₹{totalAmount}</p>
        </div>
      )}

      <button
        onClick={placeOrder}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;

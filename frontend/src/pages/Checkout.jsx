import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";

const UPI_ID = "6268947041@ibl"; // 👈 apna real UPI ID yaha daalo
const MERCHANT_NAME = "BiharBite";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showUPI, setShowUPI] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (!user) {
    navigate("/login");
    return null;
  }

  // 🔥 Dynamic UPI deep link
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${MERCHANT_NAME}&am=${totalAmount}&cu=INR&tn=Order from BiharBite`;

  // 🔥 Dynamic QR URL (NO IMAGE FILE, AUTO GENERATED)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    upiLink
  )}`;

  const placeOrder = async (paymentMethod) => {
    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount,
          paymentMethod,
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      clearCart();
      navigate("/my-orders");
    } catch (err) {
      alert("Order failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl mb-6">Checkout</h2>

      {/* ORDER SUMMARY */}
      <div className="mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <hr />
        <div className="flex justify-between font-bold mt-2">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {/* PAYMENT OPTIONS */}
      <div className="space-y-4">
        <button
          className="btn-primary w-full"
          onClick={() => setShowUPI(true)}
        >
          Pay via UPI
        </button>

        <button
          className="btn-secondary w-full"
          onClick={() => placeOrder("COD")}
        >
          Cash on Delivery
        </button>
      </div>

      {/* 🔥 DYNAMIC UPI QR */}
      {showUPI && (
        <div className="mt-8 text-center">
          <h3 className="text-lg mb-3">
            Scan & Pay ₹{totalAmount}
          </h3>

          <img
            src={qrUrl}
            alt="UPI QR Code"
            className="mx-auto border p-2 bg-white"
          />

          <p className="mt-3 text-sm text-gray-600">
            UPI ID: <b>{UPI_ID}</b>
          </p>

          <button
            className="btn-primary mt-4"
            onClick={() => placeOrder("UPI")}
          >
            Payment Done → Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

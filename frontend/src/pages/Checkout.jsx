import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // 🔥 YOUR UPI DETAILS (CHANGE ONLY THIS IF NEEDED)
  const UPI_ID = "6268947041@ibl";
  const PAYEE_NAME = "BiharBite";

  // 🔥 UPI PAYMENT URL
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${totalAmount}&cu=INR`;

  // 🔥 AUTO QR GENERATION
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    upiUrl
  )}`;

  const placeOrder = async () => {
    if (!user || !user.token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    try {
      setLoading(true);

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
          status: "Pending",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      clearCart();
      navigate("/my-orders");
    } catch (err) {
      alert(err.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      
      {/* PAYMENT SECTION */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Payment Method
        </h2>

        <label className="block mb-3">
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={() => setPaymentMethod("UPI")}
          />{" "}
          Pay via UPI (PhonePe / GPay / Paytm)
        </label>

        <label className="block mb-4">
          <input
            type="radio"
            name="payment"
            value="COD"
            onChange={() => setPaymentMethod("COD")}
          />{" "}
          Cash on Delivery (COD)
        </label>

        {/* 🔥 UPI DETAILS */}
        {paymentMethod === "UPI" && (
          <div className="border rounded p-4 mb-4 bg-gray-50">
            <p className="font-semibold mb-3 text-lg">
              Scan & Pay using UPI
            </p>

            <img
              src={qrCodeUrl}
              alt="UPI QR"
              className="w-48 mb-4 border"
            />

            {/* ✅ UPI ID CLEARLY VISIBLE */}
            <p className="text-sm mb-1">
              <span className="font-semibold">UPI ID:</span>{" "}
              <span className="font-mono text-black">
                {UPI_ID}
              </span>
            </p>

            <p className="text-sm mb-3">
              <span className="font-semibold">Amount:</span>{" "}
              ₹{totalAmount}
            </p>

            <a
              href={upiUrl}
              className="inline-block text-blue-600 text-sm underline"
            >
              Open UPI App
            </a>
          </div>
        )}

        {paymentMethod === "COD" && (
          <p className="text-sm text-gray-600 mb-4">
            Pay in cash when your order is delivered.
          </p>
        )}

        <button
          onClick={placeOrder}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {/* ORDER SUMMARY */}
      <div className="border rounded p-4">
        <h3 className="font-semibold mb-4">
          Order Summary
        </h3>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between mb-2 text-sm"
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span>
              ₹{item.price * item.qty}
            </span>
          </div>
        ))}

        <hr className="my-3" />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

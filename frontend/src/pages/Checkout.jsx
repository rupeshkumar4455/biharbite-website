import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../utils/api";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setPlacing(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((i) => ({
            name: i.name,
            qty: i.qty,
            price: i.price,
          })),
          totalAmount,
          paymentMethod,
        }),
      });

      if (!res.ok) {
        setError("Order failed. Try again.");
        setPlacing(false);
        return;
      }

      clearCart();
      navigate("/my-orders");
    } catch {
      setError("Backend not reachable");
    } finally {
      setPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">
        Checkout
      </h2>

      {/* ORDER SUMMARY */}
      <div className="border rounded p-4 mb-6">
        <h3 className="font-semibold mb-3">Order Summary</h3>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm mb-2"
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span>
              ₹{item.price * item.qty}
            </span>
          </div>
        ))}

        <div className="border-t mt-3 pt-3 font-semibold flex justify-between">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {/* PAYMENT METHOD */}
      <div className="border rounded p-4 mb-6">
        <h3 className="font-semibold mb-3">Payment Method</h3>

        <label className="flex items-center gap-2 mb-3">
          <input
            type="radio"
            checked
            readOnly
          />
          <span>UPI (PhonePe / GPay / Paytm)</span>
        </label>

        {/* UPI DETAILS */}
        <div className="bg-gray-50 p-4 rounded text-center">
          <p className="mb-2 font-medium">
            Pay using UPI
          </p>

          <img
            src="/images/upi-qr.png"
            alt="UPI QR"
            className="w-40 mx-auto mb-2"
          />

          <p className="text-sm">
            UPI ID: <b>6268947041@ibl</b>
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Scan QR or pay using UPI ID, then place order
          </p>
        </div>
      </div>

      {/* PLACE ORDER */}
      {error && (
        <p className="text-red-600 mb-3">
          {error}
        </p>
      )}

      <button
        onClick={placeOrder}
        disabled={placing}
        className="w-full bg-green-600 text-white py-3 rounded text-lg hover:bg-green-700 disabled:opacity-60"
      >
        {placing ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;

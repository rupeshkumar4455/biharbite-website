import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!paymentMethod) {
      alert("Select payment method");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: total,
          paymentMethod,
          status: "Pending",
        }),
      });

      if (!res.ok) {
        throw new Error("Order failed");
      }

      clearCart();              // 🔥 CLEAR CART
      navigate("/");            // 🔥 GO TO HOME
      alert("Order placed successfully");

    } catch (err) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      {/* PAYMENT */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Checkout
        </h2>

        <label className="block mb-2">
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          UPI (PhonePe / GPay / Paytm)
        </label>

        <label className="block mb-4">
          <input
            type="radio"
            name="payment"
            value="COD"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />{" "}
          Cash on Delivery
        </label>

        {paymentMethod === "UPI" && (
          <div className="bg-gray-100 p-3 mb-4 rounded">
            <p className="font-semibold">UPI ID</p>
            <p>6268947041@ibl</p>
          </div>
        )}

        <button
          onClick={placeOrder}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {/* SUMMARY */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-3">
          Order Summary
        </h3>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between mb-2"
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
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

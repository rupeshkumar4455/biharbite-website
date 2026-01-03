import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";

const UPI_ID = "6268947041@ibl"; // 👈 apna UPI
const MERCHANT = "BiharBite";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showUPI, setShowUPI] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const total = cartItems.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${MERCHANT}&am=${total}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    upiLink
  )}`;

  const placeOrder = async (method) => {
    await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: total,
        paymentMethod: method,
      }),
    });
    clearCart();
    navigate("/my-orders");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Checkout</h2>

      {cartItems.map((i) => (
        <div key={i.id} className="flex justify-between mb-2">
          <span>
            {i.name} × {i.qty}
          </span>
          <span>₹{i.price * i.qty}</span>
        </div>
      ))}

      <div className="font-bold mt-4">Total: ₹{total}</div>

      <button
        className="btn-primary w-full mt-4"
        onClick={() => setShowUPI(true)}
      >
        Pay via UPI
      </button>

      <button
        className="btn-secondary w-full mt-2"
        onClick={() => placeOrder("COD")}
      >
        Cash on Delivery
      </button>

      {showUPI && (
        <div className="text-center mt-6">
          <img src={qrUrl} alt="UPI QR" className="mx-auto" />
          <p className="mt-2">UPI ID: {UPI_ID}</p>
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

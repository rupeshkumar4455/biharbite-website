import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, totalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const placeOrder = async () => {
    const orderData = {
      items: cart,
      total: totalPrice,
      paymentMethod,
      status: paymentMethod === "COD" ? "Pending" : "Paid",
    };

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      alert("✅ Order placed successfully!");
    } else {
      alert("❌ Order failed");
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-box">
        <h3>Order Total: ₹{totalPrice}</h3>

        <h4>Select Payment Method</h4>

        <label>
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
          />
          Online Payment (Razorpay – next step)
        </label>

        <button onClick={placeOrder} className="place-order-btn">
          Place Order
        </button>
      </div>
    </div>
  );
}

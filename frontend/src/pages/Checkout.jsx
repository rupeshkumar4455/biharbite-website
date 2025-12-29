import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async (method) => {
    await fetch(
      "https://biharbite-backend.onrender.com/api/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: totalAmount,
          paymentMethod: method,
        }),
      }
    );

    clearCart();
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-box">
        <h2>Checkout</h2>
        <p>Total Amount: ₹{totalAmount}</p>

        <div className="payment-actions">
          <button onClick={() => placeOrder("COD")}>
            Cash on Delivery
          </button>

          <button className="online-btn">
            Pay Online (Next Step)
          </button>
        </div>
      </div>
    </div>
  );
}

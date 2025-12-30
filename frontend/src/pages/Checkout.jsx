import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // ✅ TOTAL CALCULATION (IMPORTANT)
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.qty),
    0
  );

  const placeOrder = (method) => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    alert(`Order placed successfully!\nPayment Method: ${method}`);
    clearCart();
    navigate("/");
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-card">
        <h2>Checkout</h2>

        {/* ✅ TOTAL DISPLAY */}
        <p className="checkout-total">
          Total Amount: <span>₹{totalAmount}</span>
        </p>

        <div className="payment-buttons">
          <button onClick={() => placeOrder("Cash on Delivery")}>
            Cash on Delivery
          </button>

          <button className="online-btn" onClick={() => placeOrder("Online")}>
            Pay Online
          </button>
        </div>
      </div>
    </div>
  );
}
